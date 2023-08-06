import React, { useEffect, useState } from "react";
import Wrapper from "@/components/global/wrapper";
import Header from "@/components/global/head";
import { IsLoadingOneStat, OneStat } from ".";
import { OneValue } from "./transactions/[id]";
import {
  useGet30DaysTotalPaidQuery,
  useGetBalancePaymentAccountQuery,
  useGetPaymentAccountPayoutsQuery,
  useGetPaymentAccountsQuery,
  useGetTranscationValueLast30DaysQuery,
  useGetTranscationValueLast7DaysQuery,
} from "@/services/apiHooks";
import { EmptyState, LoadingRow } from "@/components/global/loading";
import { formatDate, thousandSeparator } from "@/lib/formatters";

export interface PaymentAccount {
  id: string;
  type: string;
  currency: string;
  status: string;
  published: boolean;
  accountName: string;
}

export interface PayoutProps {
  id: string;
  currency: string;
  invoiceNumber: string;
  amount: number;
  createdAt: string;
  expiryAt: string;
  status: string;
  settlementDate: string;
  settlementStatus: string;
  transactionReference: string;
  narration: string;
}

export default function Transcations() {
  const accountId = "767c9673-298a-4e1d-b325-eb44577494d8";

  const { data, isFetching } = useGetPaymentAccountsQuery(accountId);

  const [activeAccount, setActiveAccount] = useState<PaymentAccount>();

  useEffect(() => {
    if (data?.content && activeAccount === undefined) {
      setActiveAccount(data?.content[0]);
    }
  }, [data?.content, activeAccount]);

  const accountNumber = activeAccount?.id;

  const { data: balance, isFetching: loadingBalance } =
    useGetBalancePaymentAccountQuery(
      {
        accountId,
        accountNumber,
      },
      {
        skip: !accountNumber || !accountId,
      }
    );

  const { data: totalPaid, isFetching: loadingTotalPaid } =
    useGet30DaysTotalPaidQuery(
      {
        accountId,
        accountNumber,
      },
      {
        skip: !accountNumber || !accountId,
      }
    );

  const { data: last7DaysValue, isFetching: loadingValue7 } =
    useGetTranscationValueLast7DaysQuery(accountNumber, {
      skip: !accountNumber,
    });

  const { data: last30DaysValue, isFetching: loadingLast30 } =
    useGetTranscationValueLast30DaysQuery(accountNumber, {
      skip: !accountNumber,
    });

  const [page, setPage] = React.useState(1);

  const { data: allPayouts, isLoading: isLoading } =
    useGetPaymentAccountPayoutsQuery(
      { accountNumber, page },
      {
        skip: !accountNumber,
      }
    );

  const totalPages = allPayouts?.totalPages;

  useEffect(() => {
    if (allPayouts?.number) {
      setPage(allPayouts?.number);
    }
  }, [allPayouts?.number]);

  // Helper function to generate an array of numbers from start to end
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Helper function to handle pagination click
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber < 1) {
      return;
    }
    if (pageNumber > totalPages) {
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    setPage(pageNumber);
  };

  const scrollHorizontal = (dir: "left" | "right") => {
    // scroll left or right smoothly
    const container = document.getElementById("container");
    if (container) {
      if (dir === "left") {
        container.scrollBy({
          left: -100,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: 100,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Wrapper pageTitle="Payment Accounts" custom="flex flex-col">
      <Header title="Payment Accounts" />
      <section className="bg-white rounded-lg mt-8 w-full">
        <div className="w-full relative group">
          <nav
            id="container"
            className={`flex w-full overflow-x-auto no-scrollbar bg-gray-100 ${
              isFetching ? "space-x-2" : "space-x-0"
            }`}
          >
            {!isFetching &&
              data?.content?.map((account: PaymentAccount) => (
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
            {isFetching &&
              [...Array(15)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse min-w-[150px] w-[150px] bg-gray-300 py-5 px-4 first:rounded-tl-lg last:rounded-t-lg"
                />
              ))}
          </nav>

          <div
            onClick={() => scrollHorizontal("right")}
            className="w-8 group-hover:visible lg:invisible visible h-8 transition-all ease-in duration-150 rounded-full bg-white shadow-lg absolute -right-4 flex justify-center top-1/2 -translate-y-1/2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-primaryLight"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div
            onClick={() => scrollHorizontal("left")}
            className="w-8 h-8  group-hover:visible lg:invisible visible transition-all ease-in duration-150 rounded-full bg-white shadow-lg absolute -left-4 flex justify-center top-1/2 -translate-y-1/2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-primaryLight rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>

        <section className="w-full bg-white text-gray-600 p-4 my-6 xl:flex-row flex-col rounded-2xl flex xl:gap-2 gap-8 px-8">
          <div className="flex flex-col xl:w-[30%] w-full gap-y-6">
            {isFetching ? (
              <div className="animate-pulse min-w-[200px] w-[200px] bg-gray-300 py-5 px-4 rounded-lg" />
            ) : (
              <OneValue
                label="Account Name"
                value={activeAccount?.accountName as string}
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
                    className="lucide lucide-credit-card text-primaryLight"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                }
              />
            )}
            {isFetching ? (
              <div className="animate-pulse min-w-[200px] w-[200px] bg-gray-300 py-5 px-4 rounded-lg" />
            ) : (
              <OneValue
                label="Type"
                value={`${activeAccount?.type as string}`}
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
                    className="lucide lucide-gantt-chart-square text-primaryLight"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 8h7" />
                    <path d="M8 12h6" />
                    <path d="M11 16h5" />
                  </svg>
                }
              />
            )}
            {isFetching ? (
              <div className="animate-pulse min-w-[200px] w-[200px] bg-gray-300 py-5 px-4 rounded-lg" />
            ) : (
              <OneValue
                label="Currency"
                value={activeAccount?.currency as string}
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
                    className="lucide lucide-banknote text-primaryLight"
                  >
                    <rect width="20" height="12" x="2" y="6" rx="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>
                }
              />
            )}
          </div>
          <div className="xl:w-[70%] w-full flex flex-wrap h-full justify-start gap-8">
            {loadingBalance && <IsLoadingOneStat />}
            {balance && (
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
            )}
            {loadingTotalPaid && <IsLoadingOneStat />}
            {totalPaid && (
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
            )}
            {loadingValue7 && <IsLoadingOneStat />}
            {last7DaysValue && (
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
            )}
            {loadingLast30 && <IsLoadingOneStat />}
            {last30DaysValue && (
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
            )}
          </div>
        </section>

        <div className="w-auto">
          <div className="mt-8">
            <div className="-mx-4 -my-2 overflow-x-hidden sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-lg bg-white px-0">
                  <table className="min-w-full divide-y divide-primaryLight">
                    <thead className="bg-[#f9fafb]">
                      <tr className="text-sm font-medium shadow text-[#000000]">
                        <th className="min-w-[12rem] pl-8  px-3 py-3.5 text-left">
                          Reference
                        </th>
                        <th className="px-3 py-3.5 text-left">Amount</th>
                        <th className="px-3 py-3.5 text-left hidden lg:table-cell">
                          Narration
                        </th>
                        <th className="px-3 py-3.5 text-left hidden lg:table-cell">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500">
                      {!isLoading &&
                        allPayouts?.content?.map(
                          (token: PayoutProps, i: number) => (
                            <tr
                              key={i}
                              className="cursor-pointer hover:bg-gray-50 px-4"
                            >
                              <td className="whitespace-nowrap px-3 pl-8 border-b-[1px] border-gray-100 py-4 text-sm">
                                <div className="w-full flex flex-col">
                                  {token?.transactionReference}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 border-b-[1px] border-gray-100 text-sm">
                                {thousandSeparator(token?.amount ?? 0)}{" "}
                                {token?.currency}
                              </td>
                              <td
                                className={`hidden whitespace-nowrap px-3 border-b-[1px] border-gray-100 py-4 text-xs lg:table-cell `}
                              >
                                {token?.narration}
                              </td>
                              <td
                                className={`hidden whitespace-nowrap px-3 border-b-[1px] border-gray-100 py-4 text-sm lg:table-cell`}
                              >
                                {formatDate(token?.settlementDate)}
                              </td>
                            </tr>
                          )
                        )}
                      {isLoading &&
                        [...Array(5)].map((_, index) => (
                          <LoadingRow colSpan={4} key={index} />
                        ))}
                      {allPayouts?.content?.length === 0 && (
                        <EmptyState
                          colSpan={5}
                          message="No transactions available"
                        />
                      )}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <nav
                    className="isolate inline-flex mt-8 -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      onClick={() => handlePageClick(page - 1)}
                      disabled={page === 1} // Disable the button if on the first page
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Show first page always */}
                    {/* {page === 1 && (
                      <button
                        aria-current="page"
                        className={`relative z-10 inline-flex items-center ${
                          page === 1
                            ? "bg-primary text-white" // Highlight the current page
                            : "text-gray-400"
                        } px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                        onClick={() => handlePageClick(1)}
                      >
                        1
                      </button>
                    )} */}

                    {range(1, totalPages).map((pg) => (
                      <button
                        key={pg}
                        className={`relative inline-flex items-center ${
                          pg === page
                            ? "z-10 bg-primary text-white" // Highlight the current page
                            : "text-gray-900"
                        } px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-40 focus:z-20 focus:outline-offset-0`}
                        onClick={() => handlePageClick(pg)}
                      >
                        {pg}
                      </button>
                    ))}
                    {/* Show ellipsis (...) and the last 3 pages */}
                    {totalPages > 3 && (
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                    )}

                    {/* Show last 2 pages */}
                    {totalPages > 4 && (
                      <>
                        <button
                          className={`relative hidden items-center px-4 py-2 text-sm font-semibold ${
                            page === totalPages - 2
                              ? "z-10 bg-primary text-white" // Highlight the current page
                              : "text-gray-900"
                          } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex`}
                          onClick={() => handlePageClick(totalPages - 1)}
                        >
                          {totalPages - 2}
                        </button>
                        <button
                          className={`relative hidden items-center px-4 py-2 text-sm font-semibold ${
                            page === totalPages - 1
                              ? "z-10 bg-primary text-white" // Highlight the current page
                              : "text-gray-900"
                          } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex`}
                          onClick={() => handlePageClick(totalPages - 1)}
                        >
                          {totalPages - 1}
                        </button>
                        <button
                          className={`relative inline-flex items-center rounded-r-md px-2 py-2 font-semibold text-sm text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                            page === totalPages
                              ? "bg-primary text-white" // Highlight the current page
                              : "text-gray-900"
                          }`}
                          onClick={() => handlePageClick(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    <button
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      onClick={() => handlePageClick(page + 1)}
                      disabled={page === totalPages} // Disable the button if on the last page
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
