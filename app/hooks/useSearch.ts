import { useContext, useState } from "react";
import { set } from "react-hook-form";
import { AIContext } from "../context/ai-context";

{
}
export type SearchResponseType = {
  description: string;
  title: string;
  document_id: string;
  blockchain_id: string;
  transaction_id: string;
};

const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState<SearchResponseType[]>();
  const { resetDocumentsToQuery } = useContext(AIContext);

  const fetcher = async (query: string) => {
    const url = `http://143.244.182.30:8007/search-description?query=${query}&n_results=${10}`;
    try {
      setLoading(true);
      resetDocumentsToQuery();
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setResponse(data);
        setError(false);
      } else {
        setError(true);
        throw new Error("Error: Failed to fetch response. ");
      }
    } catch (error) {
      throw new Error("Error: Network or server error. ");
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, fetcher };
};

export default useSearch;
