import { useState } from "react";
import { Inputs } from "../dashboard/UploadModal";
import axios from "axios";

const useUpLoadPDF = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const securePDF = async (inputData: Inputs) => {
    const formData = new FormData();

    if (inputData.pdf && inputData.pdf[0]) {
      formData.set("file", inputData.pdf[0]);
    } else {
      throw new Error("No PDF file provided");
    }

    try {
      setLoading(true);
      setFeedbackMessage("Uploading File to Blockchain");
      setFeedback(false);
      const blockchainData = new FormData();

      if (inputData.pdf && inputData.pdf[0]) {
        blockchainData.set("file", inputData.pdf[0]);
        blockchainData.append("title", inputData.title);
        blockchainData.append("description", inputData.description);
      }

      const response = await fetch("/api", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setFeedbackMessage("Successfully Signed File on Blockchain");
        const data = await response.json();
        setFeedbackMessage("Training OwlGuard AI");

        axios
          .post(
            `${process.env.NEXT_PUBLIC_OWLGUARD}/upload?title=${inputData.title}&description=${inputData.description}&blockchain_id=${data.blockchain_id}&transaction_id=${data.transaction_id}`,
            formData,
            {
              headers: {},
            }
          )
          .then((res) => {
            setFeedbackMessage("OwlGuard AI is now ready");
          })
          .catch((err) => {
            throw new Error("Error: Failed to fetch response. ", err);
          });
      } else {
      }
    } catch (error) {
      throw new Error("Error: Network or server error. ");
    } finally {
      setLoading(false);
      setFeedback(true);
    }
  };
  return { loading, securePDF, feedback, feedbackMessage };
};
export default useUpLoadPDF;
