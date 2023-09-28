"use client";
import axios from "axios";
import { ReactNode, createContext, use, useEffect, useState } from "react";

export type AIContextType = {
  documentsToQuery: string[];
  chatLog: MessageType[];
  setChatLog: (newLog: MessageType) => void;
  setDocumentsToQuery: (newDocuments: string) => void;
  resetDocumentsToQuery: () => void;
};

export type MessageType = {
  role: "user" | "assistant" | "initial";
  content: { message: string; source: SourceType[] };
  isVerified: boolean;
};
export type SourceType = {
  document_id: string;
  page_number: 4;
  title: string;
  description: string;
  blockchain_id: string;
  transaction_id: string;
  start_index: number;
  verified: boolean;
};

const AIContext = createContext<AIContextType>({} as AIContextType);

type AIContextProviderProps = {
  children: ReactNode;
};

const AIContextProvider = ({ children }: AIContextProviderProps) => {
  const [documentsToQuery, setInternalDocumentsQuery] = useState<string[]>([]);
  const [chatLog, setInternalChatLog] = useState<MessageType[]>([]);

  // // Load chatLog from localStorage on component mount
  // useEffect(() => {
  //   const savedChatLog = localStorage.getItem("chatLog");
  //   if (savedChatLog) {
  //     setInternalChatLog(JSON.parse(savedChatLog));
  //   }
  // }, []);

  // // Save chatLog to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("chatLog", JSON.stringify(chatLog));
  // }, [chatLog]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_OWLGUARD}/reset`);
  }, [documentsToQuery]);

  const setChatLog = (newLog: MessageType) => {
    setInternalChatLog([...chatLog, newLog]);
  };
  const setDocumentsToQuery = (title: string) => {
    setInternalDocumentsQuery((prevSelected) => {
      if (prevSelected.includes(title)) {
        return prevSelected.filter((item) => item !== title);
      } else {
        return [...prevSelected, title];
      }
    });
  };
  const resetDocumentsToQuery = () => {
    setInternalDocumentsQuery([]);
  };

  return (
    <AIContext.Provider
      value={{
        documentsToQuery,
        chatLog,
        setChatLog,
        setDocumentsToQuery,
        resetDocumentsToQuery,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export { AIContext, AIContextProvider };
