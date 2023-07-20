import Header from "@/components/global/head";
import Wrapper from "@/components/global/wrapper";
import { formatDate, thousandSeparator } from "@/lib/formatters";
import { useGetOneInvoiceQuery } from "@/services/apiHooks";
import { useRouter } from "next/router";
import React from "react";

export default function InvoiceView() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetOneInvoiceQuery(id, {
    skip: !id,
  });

  return (
    <Wrapper custom="flex flex-col gap-8">
      <Header title="Invoice View" />
      <section className="w-full bg-white text-gray-600 p-4 mt-6 rounded-2xl flex gap-2 px-8 flex-col">
        <div className="grid grid-cols-3 gap-y-4">
          <OneValue label="Invoice Number" value={data?.invoiceNumber} />
          <OneValue
            label="Amount"
            value={`${thousandSeparator(data?.amount ?? 0)} ${data?.currency}`}
          />
          <OneValue label="Merchant Name" value={`GoR`} />
          <OneValue
            label="Payment Account Identifier"
            value={data?.identifier ?? "N/A"}
          />
          <OneValue
            label="Expiry Date"
            value={data?.expiryAt ? formatDate(data?.expiryAt) : "N/A"}
          />
        </div>
      </section>

      <section className="w-full relative flex justify-around gap-8 py-6 bg-white text-gray-600 p-4 px-8 rounded-2xl">
        <OneStage
          title="Created"
          date={data?.createdAt}
          isDone={!!data?.createdAt}
        />
        <OneStage
          title="Paid"
          date={data?.paymentMadeAt}
          isDone={!!data?.paymentMadeAt}
        />
        {data?.accountType === "RRA_MERCHANT" && (
          <OneStage
            title="Approved"
            date={data?.settledAt}
            isDone={data?.paymentStatus === "SETTLED"}
          />
        )}
        <OneStage
          title="Settled"
          date={data?.settledAt}
          isDone={data?.paymentStatus === "SETTLED"}
        />

        <div className="absolute z-40 inset-x-0 w-[70%] mx-auto h-[2px] bg-gray-500 top-2/3" />
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
    <div className="flex flex-col relative z-50 w-[150px] h-[120px] justify-start items-center gap-3">
      <div className="flex flex-col justify-center items-center">
        <h3
          className={`text-xl font-semibold ${isDone ? "" : "text-gray-400"}`}
        >
          {title}
        </h3>
        <span
          className={`text-xs font-semibold ${
            isDone ? "text-gray-500" : "italic text-gray-400"
          }`}
        >
          {isDone ? formatDate(date) : "pending"}
        </span>
      </div>

      <div className="h-[100px] w-[100px] bg-white rounded-full flex justify-center items-center">
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

function OneValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 items-center flex-row w-max">
      <p className="text-base font-semibold text-gray-500">{label}</p>
      <span className="text-gray-500 text-sm font-medium">{value}</span>
    </div>
  );
}
