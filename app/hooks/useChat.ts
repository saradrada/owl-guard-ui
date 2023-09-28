import { useContext, useState } from "react";
import { AIContext, MessageType } from "../context/ai-context";
import { title } from "process";

const useChat = () => {
  const { documentsToQuery } = useContext(AIContext);
  const [response, setResponse] = useState<MessageType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendMessage = async (promtp: string) => {
    setLoading(true);
    const message = {
      prompt: promtp,
      documents: documentsToQuery,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_OWLGUARD}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (response.ok) {
        const data = await response.json();

        setResponse({
          role: "assistant",
          content: { message: data.message_response, source: data.source },
          isVerified: true,
        });
        setError(false);
      } else {
        setResponse({
          role: "assistant",
          content: {
            message: "Error: Failed to fetch response. ",
            source: [],
          },
          isVerified: true,
        });
        setError(true);
      }
    } catch (error) {
      setResponse({
        role: "assistant",
        content: {
          message: "Error: Network Error. ",
          source: [],
        },
        isVerified: true,
      });
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { response, sendMessage, loading, error };
};
export default useChat;
