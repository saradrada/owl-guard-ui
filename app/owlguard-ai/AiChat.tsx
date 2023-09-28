"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import GppGoodIcon from "@mui/icons-material/GppGood";
import GppBadIcon from "@mui/icons-material/GppBad";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatIcon from "@mui/icons-material/Chat";
import { AIContext, SourceType } from "../context/ai-context";
import useChat from "../hooks/useChat";

const AiChat = () => {
  const { chatLog, setChatLog, documentsToQuery } = useContext(AIContext);
  console.log(documentsToQuery);

  const { response, sendMessage, loading, error } = useChat();
  const [prompt, setPrompt] = useState<string>("");
  const [canChat, setCanChat] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (documentsToQuery.length === 0) {
      setCanChat(false);
    } else {
      setCanChat(true);
    }
  }, [documentsToQuery.length]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const onChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt) {
      setChatLog({
        role: "user",
        content: { message: prompt, source: [] },
        isVerified: true,
      });
      sendMessage(prompt);
      setPrompt("");
    }
  };

  useEffect(() => {
    if (response) {
      setChatLog({
        role: response.role,
        content: response.content,
        isVerified: response.isVerified,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      <div className="z-20 border-l border-gray-darker w-[100vh] p-4">
        <div className="flex flex-col flex-grow  border-gray-darker rounded-xl border-gray-darker h-full max-h-[75vh]">
          <div
            ref={chatContainerRef}
            className="flex flex-col p-4 gap-4 flex-grow overflow-y-scroll"
          >
            <MessageBox
              role="initial"
              text={
                "Hello! I'm OwlGuard AI. Ask any question, and I'll provide answers from your organization's documents backed by Blockchain. You can start by prompting me on the Semantic Search Engine on the left to quickly find specific documents."
              }
              isVerified={true}
              source={[]}
            />
            {chatLog.map((item, index) => (
              <MessageBox
                key={index}
                role={item.role}
                text={item.content.message}
                isVerified={item.content.source.every(
                  (fuente) => fuente.verified
                )}
                source={item.content.source}
              />
            ))}
            {loading && (
              <div className="animate-pulse bg-emerald-500 w-10 rounded-xl flex items-center justify-center bg-opacity-10">
                <MoreHorizIcon />
              </div>
            )}
          </div>
          <form className="w-full" onSubmit={onChat}>
            <div className="relative text-xs">
              <ChatIcon
                fontSize="inherit"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              />
              <input
                disabled={!canChat}
                type="text"
                placeholder={
                  canChat ? "Send a message" : "Select a document to chat"
                }
                className="w-full py-3 pl-12 pr-4 text-white border border-gray-dark rounded-lg outline-none bg-transparent  focus:border-emerald-600"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AiChat;

const MessageBox = ({
  role,
  text,
  source,
  isVerified,
}: {
  role: "user" | "assistant" | "initial";
  text: string;
  source: SourceType[];
  isVerified: boolean;
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const isUser = role === "user";
  const isInitial = role === "initial";
  const shieldHandler = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };
  console.log("[componente]", isVerified);

  const chatColors = () => {
    if (!isUser) {
      return "bg-emerald-600 bg-opacity-20";
    }
    // if (!isUser && !isVerified) {
    //   return "bg-red-600 bg-opacity-20";
    // }
    if (isUser) {
      return "bg-sky-600 bg-opacity-20";
    }
  };

  // Buscar el primer elemento con 'verified' en false y obtener su 'title'
  const elementoNoVerificado = source.find(
    (mensaje) => mensaje.verified === false
  );

  return (
    <div className={`flex w-full  ${isUser && "justify-end"}`}>
      <div
        className={`min-w-[50%] shadow-xl max-w-[95%] text-xs p-4 rounded text-slate-200 ${chatColors()}`}
      >
        <div
          className={`flex items-center ${
            isUser && isInitial ? "justify-end" : "justify-between"
          }`}
        >
          <p className="text-emerald-500 font-semibold">
            {isUser ? "Me" : "OwlGuard AI:"}
          </p>
          {!isUser && !isInitial && (
            <div className="relative">
              <button
                title="Tooltip"
                type="button"
                className="text-xl mb-2 ml-2"
                onClick={shieldHandler}
              >
                {isVerified ? (
                  <GppGoodIcon
                    fontSize="inherit"
                    className="text-emerald-500 hover:text-emerald-400"
                  />
                ) : (
                  <GppBadIcon
                    fontSize="inherit"
                    className="text-red-800 hover:text-red-500"
                  />
                )}
              </button>
              {isTooltipOpen && (
                <>
                  <div className="z-30 shadow-xl absolute left-0 top-0  transform -translate-x-full bg-gray-darker p-4 rounded">
                    {isVerified ? (
                      <>
                        <div className="text-2xl mb-4 flex w-full items-center justify-center">
                          <GppGoodIcon
                            fontSize="inherit"
                            className="text-emerald-500"
                          />
                          <span className="text-base text-emerald-500">
                            OwlGuard Verified Source
                          </span>
                        </div>
                        <p className="whitespace-nowrap mb-4 font-semibold">
                          The source of this response is a verified document.
                        </p>
                        <p className="text-emerald-500">Source:</p>
                        <p className="">
                          {Array.from(
                            new Set(
                              source.map(
                                (item) =>
                                  `${item.title} (page ${item.page_number})`
                              )
                            )
                          ).join(", ")}
                        </p>

                        <p className="text-emerald-500">Document(s) Type:</p>
                        <p className="whitespace-nowrap">PDF</p>
                        <p className="text-emerald-500">Blockchain:</p>
                        <p className="whitespace-nowrap">
                          ULedger Dev Challenge 5
                        </p>
                        <p className="text-emerald-500">Transaction ID:</p>
                        <p className="break-all">
                          {Array.from(
                            new Set(
                              source.map(
                                (item) =>
                                  `${item.title}: ${item.transaction_id}`
                              )
                            )
                          ).join(", ")}
                        </p>
                        <p className="mt-4 font-light text-emerald-500">
                          Powered by ULedger
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl mb-4 flex w-full items-center justify-center">
                          <GppBadIcon
                            fontSize="inherit"
                            className="text-red-500"
                          />
                          <span className="text-base text-red-500 whitespace-nowrap">
                            OwlGuard Not Verified
                          </span>
                        </div>

                        <p className="whitespace-nowrap ">
                          The source(s) of this response have been modified.
                        </p>
                        <p className="mb-4">
                          This document does not match the original stored on
                          ULedger Blockchain, and its content may be unreliable.
                        </p>

                        <p className="text-red-500">Document Title(s):</p>
                        <p className="whitespace-nowrap">
                          {elementoNoVerificado?.title}
                        </p>
                        <p className="text-red-500">Document Type:</p>
                        <p className="whitespace-nowrap">PDF</p>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};
