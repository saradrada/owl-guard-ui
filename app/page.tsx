"use client";
import React from "react";
import Features from "./components/Features/Features";

const page = () => {
  return (
    <section className="md:my-14 relative m-6">
      <div className="relative flex flex-col items-center">
        <div className="relative z-10 max-w-screen-xl md:px-8 w-full">
          <p className="font-semibold text-emerald-500 max-w-xl">
            Powered By ULedger
          </p>
          <p className="mt-3 text-white text-3xl font-extrabold sm:text-5xl max-w-xl">
            Where every document tells a Verified Story.
          </p>
          <div className="text-lg mt-6 text-gray-400 max-w-xl">
            <p>
              Secure storage meets intelligence. Upload your documents, ensure
              their authenticity with ULedger blockchain, and seamlessly query
              them using our advanced AI. Trust in every answer.
            </p>
          </div>
          <div className="text-sm font-medium mt-6 space-y-2 sm:flex sm:space-x-2 sm:space-y-0">
            <a
              className="flex items-center justify-center gap-1 py-3 px-4 rounded-md text-center text-white dark:text-white -none bg-gray-800 dark:bg-emerald-600 shadow w-full hover:bg-gray-700 dark:hover:bg-emerald-700 duration-150 sm:w-auto sm:py-2.5"
              href="/components#components"
            >
              Get Started
            </a>
          </div>
        </div>
        <div
          className="absolute inset-0 max-w-lg m-auto h-[27rem] sm:h-64 sm:max-w-7xl"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(62, 217, 56, 0.12) 56.49%, rgba(64, 167, 150, 0.4) 115.91%); filter: blur(118px);",
          }}
        ></div>
      </div>
      <Features />
    </section>
  );
};

export default page;
