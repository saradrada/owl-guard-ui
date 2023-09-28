"use client";
import SearchIcon from "@mui/icons-material/Search";
import React, { useContext, useEffect, useState } from "react";
import { AIContext } from "../context/ai-context";
import useSearch from "../hooks/useSearch";
import { ResultCard } from "./AiSemanticSearch";

export const AiSemanticSearch = () => {
  const [query, setQuery] = useState<string>("");
  const { documentsToQuery } = useContext(AIContext);
  const { response, loading, error, fetcher } = useSearch();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      fetcher(query);
      setQuery("");
    }
  };
  useEffect(() => {
    if (documentsToQuery.length === 0) {
    }
  }, [documentsToQuery.length]);

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
              placeholder="Which documents are related to..."
              className="w-full py-3 pl-12 pr-4 text-white border border-gray-dark rounded-lg outline-none bg-transparent  focus:border-emerald-600"
            />
          </form>
        </div>
        <div className="flex flex-wrap gap-4 px-8 py-4">
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
