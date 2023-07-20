import Header from "@/components/global/head";
import Wrapper from "@/components/global/wrapper";
import React from "react";

export default function InvoiceView() {
  return (
    <Wrapper custom="flex flex-col gap-8">
      <Header title="Invoice View" />
      <section className="w-full bg-white text-gray-600 p-4 rounded-2xl flex flex-col">
        <h2 className="text-2xl font-bold">Invoice 23453463456</h2>
        <OneValue
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          }
          label="Account"
          value="Account 1"
        />
      </section>

      <section className="w-full relative flex justify-around gap-8 py-6 bg-white text-gray-600 p-4 rounded-2xl">
        <OneStage title="Created" date="fdsfsdgs" isDone />
        <OneStage title="Paid" date="fdgsdfg" isDone />
        <OneStage title="Approved" date="gfdgsfdg" isDone={false} />
        <OneStage title="Settled" date="gfdsgdfhg" isDone={false} />

        <div className="absolute z-40 inset-x-0 w-3/4 mx-auto h-[2px] bg-gray-500 top-2/3" />
      </section>
    </Wrapper>
  );
}

function OneStage({
  title,
  date,
  isDone,
}: {
  title: string;
  date: string;
  isDone: boolean;
}) {
  return (
    <div className="flex flex-col bg-white relative z-50 w-[110px] h-[120px] justify-start items-center gap-3">
      <div className="flex flex-col justify-center items-center">
        <h3
          className={`text-xl font-semibold ${isDone ? "" : "text-gray-400"}`}
        >
          {title}
        </h3>
        <span
          className={`text-sm font-medium ${
            isDone ? "" : "italic text-gray-400"
          }`}
        >
          {isDone ? date : "pending"}
        </span>
      </div>

      <div
        className={` rounded-full flex justify-center shrink-0 items-center ${
          isDone
            ? "bg-primaryLight text-white w-[60px] h-[60px]"
            : "bg-gray-300 text-gray-500 w-[45px] h-[45px]"
        }`}
      >
        {isDone ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={isDone ? "32" : "24"}
            height={isDone ? "32" : "24"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-check-check"
          >
            <path d="M18 6 7 17l-5-5" />
            <path d="m22 10-7.5 7.5L13 16" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={isDone ? "32" : "24"}
            height={isDone ? "32" : "24"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-loader-2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        )}
      </div>
    </div>
  );
}

function OneValue({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      {icon}
      <div className="flex flex-col gap-0">
        <p className="text-xl font-semibold text-gray-800">{label}</p>
        <span className="text-gray-500 text-base font-medium">{value}</span>
      </div>
    </div>
  );
}
