import Header from "@/components/global/head";
import Tooltip from "@/components/global/tooltip";
import Wrapper from "@/components/global/wrapper";
import { formatDate, thousandSeparator } from "@/lib/formatters";
import { useGetOneInvoiceQuery } from "@/services/apiHooks";
import { useRouter } from "next/router";
import React from "react";

import { motion } from "framer-motion";

export default function InvoiceView() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isFetching } = useGetOneInvoiceQuery(id, {
    skip: !id,
  });

  return (
    <Wrapper pageTitle="Transactions View" custom="flex flex-col gap-8">
      <Header title="Transactions View" />
      {isFetching || !data ? (
        <section className="animate-pulse bg-gray-200 w-full text-gray-600 h-[100px] p-4 mt-6 rounded-2xl flex gap-2 px-8 flex-col" />
      ) : (
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="w-full bg-white text-gray-600 p-4 py-16 mt-6 rounded-2xl flex gap-2 lg:px-8 px-4 flex-col"
        >
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-6 xl:w-1/2 w-full mx-auto place-content-center">
            <OneValue
              label="Invoice Number"
              value={data?.invoiceNumber}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-primaryLight"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  />
                </svg>
              }
            />
            <OneValue
              label="Amount"
              value={`${thousandSeparator(data?.amount ?? 0)} ${
                data?.currency
              }`}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-wallet text-primaryLight"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              }
            />
            <OneValue
              label="Merchant Name"
              value={`GoR`}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-briefcase text-primaryLight"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              }
            />
            <OneValue
              label="Account Identifier"
              value={data?.identifier ?? "N/A"}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-fingerprint text-primaryLight"
                >
                  <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
                  <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
                  <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                  <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                  <path d="M8.65 22c.21-.66.45-1.32.57-2" />
                  <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                  <path d="M2 16h.01" />
                  <path d="M21.8 16c.2-2 .131-5.354 0-6" />
                  <path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" />
                </svg>
              }
            />
            <OneValue
              label="Expiry Date"
              value={data?.expiryAt ? formatDate(data?.expiryAt) : "N/A"}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-calendar-clock text-primaryLight"
                >
                  <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h5" />
                  <path d="M17.5 17.5 16 16.25V14" />
                  <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
                </svg>
              }
            />
          </div>
        </motion.section>
      )}

      {isFetching || !data ? (
        <section className="animate-pulse bg-gray-200 w-full text-gray-600 h-[170px] p-4 mt-6 rounded-2xl flex gap-2 px-8 flex-col" />
      ) : (
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: "easeIn", delay: 0.1 }}
          className="w-full relative flex xl:flex-row flex-col xl:justify-around justify-center items-center gap-8 xl:py-20 py-8 bg-white text-gray-600 p-4 xl:px-8 px-0 rounded-2xl"
        >
          <OneStage
            title="Created"
            date={data?.createdAt}
            isDone={!!data?.createdAt}
            description="Invoice generated by customer"
          />
          <OneStage
            title="Paid"
            date={data?.paymentMadeAt}
            isDone={!!data?.paymentMadeAt}
            description="The customer has paid the invoice"
          />
          <OneStage
            title="Processed"
            date={data?.paymentMadeAt}
            isDone={
              !!data?.settlementTransactionId ||
              data?.paymentStatus === "SETTLED"
            }
            description="Payout has been scheduled"
          />
          {data?.accountType === "RRA_MERCHANT" && (
            <OneStage
              title="Approved"
              date={data?.settledAt}
              isDone={data?.paymentStatus === "SETTLED"}
              description="Payout has been approved for settlement"
            />
          )}
          <OneStage
            title="Settled"
            date={data?.settledAt}
            isDone={data?.paymentStatus === "SETTLED"}
            description="Payout has been settled to the merchant"
          />

          <div className="absolute z-40 inset-x-0 w-[70%] hidden mx-auto h-[2px] bg-gray-500 top-[60%]" />
        </motion.section>
      )}
    </Wrapper>
  );
}

function OneStage({
  title,
  date,
  isDone,
  description,
}: {
  title: string;
  date: string;
  isDone: boolean;
  description: string;
}) {
  return (
    <div className="flex flex-col relative w-[150px] h-[120px] justify-start items-center gap-3">
      <div
        className={`absolute xl:block hidden z-40 -inset-x-2/3 w-auto mx-auto h-[2px] bg-gray-500 top-[72.5%] ${
          title === "Created" && "left-8"
        } ${title === "Settled" && "right-8"}`}
      />
      <div className="flex flex-col justify-center items-center relative z-50">
        <h3
          className={`text-xl flex gap-2 items-center font-semibold ${
            isDone ? "" : "text-gray-400"
          }`}
        >
          {title}
          <Tooltip
            direction={`${isDone ? "top" : "top italic"}`}
            content={`${isDone ? description : "pending - " + description}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-info"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </Tooltip>
        </h3>
        <span
          className={`text-xs font-semibold ${
            isDone ? "text-gray-500" : "italic text-gray-400"
          }`}
        >
          {isDone ? formatDate(date) : "pending"}
        </span>
      </div>

      <div className="h-[100px] relative z-50 w-[100px] bg-white rounded-full flex justify-center items-center">
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
    </div>
  );
}

export function OneValue({
  label,
  value,
  svg,
}: {
  label: string;
  value: string;
  svg: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 sm:items-center sm:flex-row flex-col w-max">
      <div className="flex gap-2">
        {svg}
        <p className="text-base font-semibold text-gray-500">{label}</p>
      </div>

      <span className="text-gray-500 text-sm font-medium">{value}</span>
    </div>
  );
}
