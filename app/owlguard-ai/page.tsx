import React from "react";
import AiChat from "./AiChat";
import AiSemanticSearch from "./AiSemanticSearch";

const page = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full flex-grow z-10">
        <AiSemanticSearch />
        <AiChat />
      </div>
      <div
        className="absolute inset-0 max-w-lg m-auto h-[27rem] sm:h-64 sm:max-w-7xl"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(62, 217, 56, 0.12) 56.49%, rgba(64, 167, 150, 0.4) 115.91%); filter: blur(118px)",
        }}
      ></div>
    </>
  );
};

export default page;
