import type { Key } from "react";
import React, { useEffect, useState } from "react";
import Wrapper from "@/components/global/wrapper";
import Header from "@/components/global/head";
import { OneStat } from ".";
import { OneValue } from "./transactions/[id]";
import {
  useGet30DaysTotalPaidQuery,
  useGetBalancePaymentAccountQuery,
  useGetPaymentAccountsQuery,
  useGetTranscationValueLast30DaysQuery,
  useGetTranscationValueLast7DaysQuery,
} from "@/services/apiHooks";

export interface PaymentAccount {
  id: string;
  type: string;
  currency: string;
  status: string;
  published: boolean;
  accountName: string;
}

export default function Transcations() {
  const accountId = "767c9673-298a-4e1d-b325-eb44577494d8";

  const { data } = useGetPaymentAccountsQuery(accountId);

  const [activeAccount, setActiveAccount] = useState<PaymentAccount>();

  useEffect(() => {
    if (data?.content) {
      setActiveAccount(data?.content[0]);
    }
  }, [data?.content]);

  const accountNumber = activeAccount?.id;

  const { data: balance } = useGetBalancePaymentAccountQuery(
    {
      accountId,
      accountNumber,
    },
    {
      skip: !accountNumber || !accountId,
    }
  );

  const { data: totalPaid } = useGet30DaysTotalPaidQuery(
    {
      accountId,
      accountNumber,
    },
    {
      skip: !accountNumber || !accountId,
    }
  );

  const { data: last7DaysValue } = useGetTranscationValueLast7DaysQuery(
    accountNumber,
    {
      skip: !accountNumber,
    }
  );

  const { data: last30DaysValue } = useGetTranscationValueLast30DaysQuery(
    accountNumber,
    {
      skip: !accountNumber,
    }
  );

  return (
    <Wrapper custom="flex flex-col">
      <Header title="Payment Accounts" />
      <section className="bg-white rounded-lg mt-8 overflow-hidden w-full">
        <nav className="flex space-x-0 w-full overflow-x-auto no-scrollbar bg-gray-100">
          {data?.content?.map((account: PaymentAccount) => (
            <button
              key={account?.id}
              type="button"
              onClick={() => {
                setActiveAccount(account);
              }}
              className={`py-3 px-4 inline-flex transition-colors ease-in duration-300 items-center font-medium text-sm border-r-[1px] border-b-[1px] text-center first:rounded-tl-lg last:rounded-t-lg whitespace-nowrap ${
                activeAccount?.id === account?.id
                  ? "text-primary rounded-t-lg bg-white border-r-gray-200 border-b-transparent"
                  : "text-gray-600 bg-gray-100 border-r-transparent border-b-gray-200 hover:bg-gray-50"
              }`}
            >
              {account?.accountName}
            </button>
          ))}
        </nav>

        <section className="w-full bg-white text-gray-600 p-4 my-6 rounded-2xl flex gap-2 px-6">
          <div className="flex flex-col w-[30%] gap-y-6">
            <OneValue
              label="Account Name"
              value={activeAccount?.accountName as string}
            />
            <OneValue label="Type" value={`${activeAccount?.type as string}`} />
            <OneValue
              label="Currency"
              value={activeAccount?.currency as string}
            />
          </div>
          <div className="w-[70%] flex flex-wrap h-full justify-start gap-8">
            <OneStat
              title="Account Balance (RWF)"
              value={balance?.content[0]?.walletBalance ?? 0}
              icon={
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
                  className="lucide lucide-bar-chart-horizontal-big  text-white"
                >
                  <path d="M3 3v18h18" />
                  <rect width="12" height="4" x="7" y="5" rx="1" />
                  <rect width="7" height="4" x="7" y="13" rx="1" />
                </svg>
              }
            />
            <OneStat
              title="Total Paid Invoices (30 Days)"
              value={totalPaid ? totalPaid[0]?.count : 0}
              ignoreZero
              icon={
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
                  className="lucide lucide-bar-chart-horizontal-big  text-white"
                >
                  <path d="M3 3v18h18" />
                  <rect width="12" height="4" x="7" y="5" rx="1" />
                  <rect width="7" height="4" x="7" y="13" rx="1" />
                </svg>
              }
            />
            <OneStat
              title="Generated Revenue Last 7 Days (RWF)"
              value={last7DaysValue ? last7DaysValue[0]?.sum : 0}
              icon={
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
                  className="lucide lucide-bar-chart-horizontal-big  text-white"
                >
                  <path d="M3 3v18h18" />
                  <rect width="12" height="4" x="7" y="5" rx="1" />
                  <rect width="7" height="4" x="7" y="13" rx="1" />
                </svg>
              }
            />
            <OneStat
              title="Generated Revenue Last 30 Days (RWF)"
              value={last30DaysValue ? last30DaysValue[0]?.sum : 0}
              icon={
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
                  className="lucide lucide-bar-chart-horizontal-big  text-white"
                >
                  <path d="M3 3v18h18" />
                  <rect width="12" height="4" x="7" y="5" rx="1" />
                  <rect width="7" height="4" x="7" y="13" rx="1" />
                </svg>
              }
            />
          </div>
        </section>
      </section>
    </Wrapper>
  );
}
