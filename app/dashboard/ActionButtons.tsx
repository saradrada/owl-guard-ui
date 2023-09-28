"use client";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import PolicyRoundedIcon from "@mui/icons-material/PolicyRounded";
import { createPortal } from "react-dom";
import { useState } from "react";
import dynamic from "next/dynamic";

const UploadModal = dynamic(() => import("./UploadModal"));

const integrations = [
  {
    title: "Secure & Upload PDF",
    desc: "Upload your PDF to join the blockchain-validated database accessible to our AI.",
    icon: <UploadFileRoundedIcon fontSize="inherit" />,
    action: "upload",
  },
  {
    title: "AI Powered Insights",
    desc: "Engage with our AI for insights and answers from your blockchain-validated PDFs.",
    icon: <PolicyRoundedIcon fontSize="inherit" />,
    action: "ai",
  },
];

const ActionButton = () => {
  const [uploadModalState, setUploadModalState] = useState<boolean>(false);
  const actionHandler = (action: string) => {
    switch (action) {
      case "upload":
        setUploadModalState(!uploadModalState);
        break;
      case "ai":
        window.location.href = "/owlguard-ai";
        break;
      default:
        break;
    }
  };
  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-md">
          <h1 className="text-white text-xl font-extrabold sm:text-2xl">
            OwlGuard Dashboard
          </h1>
          <p className="mt-2 max-w-screen-sm">
            Centralize your documents, verification status, and AI queries in
            one intuitive dashboard.
          </p>
        </div>
        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {integrations.map((item, index) => (
            <li
              tabIndex={index}
              key={item.title}
              title={item.title}
              onClick={() => actionHandler(item.action)}
              className="border border-gray-dark rounded-lg shadow bg-emerald-700 bg-opacity-10 hover:bg-opacity-20 cursor-pointer  transition ease-in-out delay-50"
            >
              <div className="flex items-start justify-between p-4">
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">{item.title}</h4>
                  <p className="text-emerald-500 text-sm max-w-sm">
                    {item.desc}
                  </p>
                </div>
                <div className="text-emerald-500 text-6xl">{item.icon}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <UploadModal
        isOpen={uploadModalState}
        onClose={(state) => setUploadModalState(state)}
      />
    </section>
  );
};

export default ActionButton;
