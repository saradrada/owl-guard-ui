"use client";
import SearchIcon from "@mui/icons-material/Search";
import React, { useContext, useEffect, useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { AIContext } from "../context/ai-context";
import useSearch from "../hooks/useSearch";

const AiSemanticSearch = () => {
  const [query, setQuery] = useState<string>("");

  const { response, loading, fetcher } = useSearch();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      fetcher(query);
      setQuery("");
    }
  };

  return (
    <>
      <div className="flex flex-col  w-[100vh]">
        <div className=" py-4 px-8">
          <p className="text-emerald-500 my-4 pl-2">
            Semantic Search{" "}
            <span className="text-sm text-slate-500">
              Prompt OwlGuard AI to search for verified documents.
            </span>
          </p>

          <form onSubmit={onSearch} className="relative text-xs">
            <SearchIcon
              fontSize="inherit"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
            />
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              value={query}
              placeholder="Show me documents related to..."
              className="w-full py-3 pl-12 pr-4 text-white border border-gray-dark rounded-lg outline-none bg-transparent  focus:border-emerald-600"
            />
          </form>
        </div>
        <div className="flex flex-wrap justify-between gap-4 px-8 py-4">
          {loading && (
            <>
              {Array.from(Array(8).keys()).map((item) => (
                <div
                  key={item}
                  className={`flex shadow bg-gray-darker flex-col items-center animate-pulse rounded rounded-xl w-36 h-36 p-2 `}
                ></div>
              ))}
            </>
          )}
          {response &&
            !loading &&
            response.map((result) => (
              <div key={result.transaction_id}>
                <ResultCard
                  title={result.title}
                  transaction_id={result.transaction_id}
                  blockchain_id={result.blockchain_id}
                  document_id={result.document_id}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AiSemanticSearch;

const ResultCard = ({
  title,
  transaction_id,
  blockchain_id,
  document_id,
}: {
  title: string;
  transaction_id: string;
  blockchain_id: string;
  document_id: string;
}) => {
  const { setDocumentsToQuery } = useContext(AIContext);
  const [isSelected, setIsSelected] = React.useState(false);
  const passSelection = () => {
    setIsSelected(!isSelected);
    setDocumentsToQuery(document_id);
  };

  return (
    <>
      <button
        title={title}
        type={"button"}
        onClick={() => passSelection()}
        className={`flex shadow-xl bg-gray-darker bg-opacity-20 flex-col items-center border rounded rounded-xl w-36 h-36 p-2 ${
          isSelected
            ? "border-emerald-500 bg-emerald-500 bg-opacity-20"
            : "border-gray-dark"
        }`}
      >
        <div className="text-4xl">
          <PictureAsPdfIcon fontSize="inherit" />
        </div>
        <p className="text-emerald-500 text-xs mt-2 text-center">
          Document Title:
        </p>
        <p className="text-white font-semibold text-xs mt-1 text-center">
          {title}
        </p>
        <p className="text-white text-xs mt-1 text-center">PDF</p>
      </button>
    </>
  );
};
