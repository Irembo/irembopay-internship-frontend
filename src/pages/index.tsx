import DailyTranscations from "@/components/dashboard/charts/dailyTranscations";
import SettledTranscations from "@/components/dashboard/charts/settledTranscations";
import Header from "@/components/global/head";
import Loading from "@/components/global/loading";
import Wrapper from "@/components/global/wrapper";
import CreateAvatar from "@/lib/avatar";
import { formatToK } from "@/lib/formatters";
import {
  useGetBalanceQuery,
  useGetDailyPaidInvoicesQuery,
  useGetDailySettledPayoutsQuery,
  useGetProjectedBalanceQuery,
  useGetTotalPaidInvoicesQuery,
} from "@/services/apiHooks";
import { useState } from "react";

import { motion } from "framer-motion";

export default function Home() {
  const accountId = "767c9673-298a-4e1d-b325-eb44577494d8";
  const { data: totalInvoices, isLoading: loadingTotalInvoices } =
    useGetTotalPaidInvoicesQuery(accountId);

  const { data: balances, isLoading: loadingBalances } =
    useGetBalanceQuery(accountId);

  const { data: projectedBalances } = useGetProjectedBalanceQuery(accountId);

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case "USD":
        return (
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
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
            <path d="M12 18V6" />
          </svg>
        );
      case "RWF":
        return (
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
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        );
      case "EUR":
        return (
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
            <path d="M4 10h12" />
            <path d="M4 14h9" />
            <path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
          </svg>
        );
      case "GBP":
        return (
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
            <path d="M18 7c0-5.333-8-5.333-8 0" />
            <path d="M10 7v14" />
            <path d="M6 21h12" />
            <path d="M6 13h10" />
          </svg>
        );

      default:
        return "";
    }
  };

  const [activeCycleInvoices, setActiveCycleInvoices] = useState(30);
  const [activeCyclePayouts, setActiveCyclePayouts] = useState(30);

  const { data: dailyPaid, isFetching: fetchingInvoices } =
    useGetDailyPaidInvoicesQuery(
      {
        accountId,
        activeCycleInvoices,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );
  const { data: dailySettled, isFetching: fetchingPayouts } =
    useGetDailySettledPayoutsQuery(
      {
        accountId,
        activeCyclePayouts,
      },
      { refetchOnMountOrArgChange: true }
    );

  return (
    <>
      <Header />
      <Wrapper custom="flex flex-col justify-center min-h-screen gap-16 relative">
        <div className="absolute top-8 right-4 flex justify-between inset-x-0 px-4">
          <h1 className="text-gray-800 font-bold text-2xl">Hi, welcome! 👋</h1>
          <div className="flex gap-4">
            <div className="flex flex-col gap-0">
              <p className="text-xl font-semibold text-gray-800">Jane Doe</p>
              <span className="text-gray-500 text-base font-medium">
                jane.doe@hello.com
              </span>
            </div>
            <CreateAvatar seed="Jane Doe" />
          </div>
        </div>
        <section className="w-full h-1/2 flex justify-center gap-8 mt-8">
          {totalInvoices && (
            <OneStat
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
              title="Total Paid Invoices"
              value={totalInvoices}
            />
          )}
          {loadingTotalInvoices && <IsLoadingOneStat />}

          {balances &&
            balances?.map(
              (
                bal: {
                  currency: string;
                  totalAmount: number;
                },
                i: number
              ) => (
                <OneStat
                  key={i}
                  title={`${bal?.currency} Balance`}
                  value={bal?.totalAmount}
                  icon={getCurrencyIcon(bal?.currency?.toUpperCase())}
                  projectedValue={
                    projectedBalances?.filter(
                      (p: { currency: string; totalAmount: number }) =>
                        p?.currency === bal?.currency
                    )[0]?.totalAmount
                  }
                />
              )
            )}

          {loadingBalances && Array(4).fill(<IsLoadingOneStat />)}
        </section>

        <section className="w-full gap-8 h-[400px] flex">
          <div className="flex w-1/2 flex-col">
            <h2 className="text-gray-800 font-semibold text-xl">
              Daily Paid Transcations
            </h2>
            {fetchingInvoices ? (
              <div className="w-full h-[400px] flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              <DailyTranscations data={dailyPaid} />
            )}
            <div className="flex justify-center gap-4">
              <button
                className={`py-2 px-4 rounded-3xl text-sm font-semibold ${
                  activeCycleInvoices === 7
                    ? "bg-primaryLight text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setActiveCycleInvoices(7)}
              >
                Last Week
              </button>
              <button
                className={`py-2 px-4 rounded-3xl text-sm font-semibold ${
                  activeCycleInvoices === 30
                    ? "bg-primaryLight text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setActiveCycleInvoices(30)}
              >
                Last Month
              </button>
              <button
                className={`py-2 px-4 rounded-3xl text-sm font-semibold ${
                  activeCycleInvoices === 365
                    ? "bg-primaryLight text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setActiveCycleInvoices(365)}
              >
                Last Year
              </button>
            </div>
          </div>

          <div className="flex w-1/2 flex-col">
            <h2 className="text-gray-800 font-semibold text-xl">
              Daily Settled Transcations
            </h2>
            {fetchingPayouts ? (
              <div className="w-full h-[400px] flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              <SettledTranscations data={dailySettled} />
            )}
            <div className="flex justify-center gap-4">
              <button
                className={`py-2 px-4 rounded-3xl text-sm font-semibold ${
                  activeCyclePayouts === 7
                    ? "bg-primaryLight text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setActiveCyclePayouts(7)}
              >
                Last Week
              </button>
              <button
                className={`py-2 px-4 rounded-3xl text-sm font-semibold ${
                  activeCyclePayouts === 30
                    ? "bg-primaryLight text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setActiveCyclePayouts(30)}
              >
                Last Month
              </button>
              <button
                className={`py-2 px-4 rounded-3xl text-sm font-semibold ${
                  activeCyclePayouts === 365
                    ? "bg-primaryLight text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setActiveCyclePayouts(365)}
              >
                Last Year
              </button>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}

function OneStat({
  title,
  value,
  icon,
  projectedValue,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  projectedValue?: number;
}) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white relative rounded-xl p-4 shadow-md w-[300px] items-start justify-start gap-8 flex"
    >
      <div className="h-12 w-12 my-auto bg-primary/70 rounded-md flex justify-center items-center">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm text-gray-500 font-medium">{title}</h2>
        <span
          title={value?.toString()}
          className="text-3xl font-semibold tracking-tighter text-gray-600"
        >
          {formatToK(value)}
        </span>
        {projectedValue ? (
          <span className="text-sm text-gray-500 font-medium">
            Projected increase{" "}
            {projectedValue - value > 0
              ? formatToK(projectedValue - value)
              : projectedValue - value}{" "}
          </span>
        ) : (
          <span></span>
        )}
      </div>
    </motion.div>
  );
}

function IsLoadingOneStat() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="animate-pulse whitespace-nowrap w-[300px] bg-gray-300 h-[124px] rounded-xl"
    ></motion.div>
  );
}
