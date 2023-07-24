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

export default function Transcations() {
  const accountId = "767c9673-298a-4e1d-b325-eb44577494d8";

  const { data } = useGetPaymentAccountsQuery(accountId);

  const [activeAccount, setActiveAccount] = useState<{
    id: string;
    type: string;
    currency: string;
    status: string;
    published: boolean;
    accountName: string;
  }>();

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
    <Wrapper>
      <Header title="Payment Accounts" />
      <section className="w-full bg-white text-gray-600 p-4 my-6 rounded-2xl flex gap-2 px-8 flex-col">
        <div className="grid grid-cols-3 gap-y-4">
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
      </section>
      <div className="w-auto h-full flex justify-center gap-8">
        <OneStat
          title="Account Balance (RWF)"
          value={balance?.content[0]?.walletBalance ?? 0}
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
        />
        <OneStat
          title="Total Paid Invoices (30 Days)"
          value={totalPaid ? totalPaid[0]?.count : 0}
          // ignoreZero
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
        />
        <OneStat
          title="Generated Revenue Last 7 Days (RWF)"
          value={last7DaysValue ? last7DaysValue[0]?.sum : 0}
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
        />
        <OneStat
          title="Generated Revenue Last 30 Days (RWF)"
          value={last30DaysValue ? last30DaysValue[0]?.sum : 0}
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
        />
      </div>
    </Wrapper>
  );
}
