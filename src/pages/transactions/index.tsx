import { formatDate, thousandSeparator } from "@/lib/formatters";
import {
  useGetInvoicesQuery,
  useSearchForTranscationMutation,
} from "@/services/apiHooks";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { EmptyState, LoadingRow } from "@/components/global/loading";
import Wrapper from "@/components/global/wrapper";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/global/head";
import { useOnClickOutside } from "@/components/global/onClickOutside";

export interface InvoiceProps {
  id: string;
  currency: string;
  invoiceNumber: string;
  amount: number;
  createdAt: string;
  expiryAt: string;
  paymentStatus: string;
  status: string;
}

export default function Transcations() {
  // const accountId = "9f6d595a-85fa-4527-847d-8c985e7dd405";
  const accountId = "767c9673-298a-4e1d-b325-eb44577494d8";

  const [page, setPage] = React.useState(0);

  const { data, isLoading, refetch } = useGetInvoicesQuery(
    { accountId, page },
    {
      skip: !accountId,
    }
  );

  const router = useRouter();

  const [totalPages, setTotalPages] = useState<number>(1);

  const [allInvoices, setAllInvoices] = useState<InvoiceProps[]>([]);

  useEffect(() => {
    if (data) {
      setPage(data?.number);
      setTotalPages(data?.totalPages);
      setAllInvoices(data?.content);
    }
  }, [data]);

  // Helper function to generate an array of numbers from start to end
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Helper function to handle pagination click
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber < 0) {
      return;
    }
    if (pageNumber > totalPages) {
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(pageNumber);
  };

  // Number of pages to show after "..." (in this case, it's 3)
  const numPagesAfterDots = 2;

  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [nonApiStatus, setNonApiStatus] = useState<string | null>(null);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const [searchInvoices, { isLoading: searching }] =
    useSearchForTranscationMutation();

  const searchAction = async () => {
    if (invoiceNumber?.length === 0 && !status) {
      isSearch && refetch();
      setIsSearch(false);
      return;
    }
    await searchInvoices({ accountId, invoiceNumber, status })
      .unwrap()
      .then((payload) => {
        setNonApiStatus(status);
        setPage(payload?.number);
        setTotalPages(payload?.totalPages);
        setAllInvoices(payload?.content);
        setIsSearch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <Wrapper pageTitle="Transcations">
      <Header title="Transcations" />

      <section className="rounded-lg bg-white p-4 gap-4 mt-8 flex flex-col">
        <h2 className="text-gray-600">Search your transcations</h2>
        <div className="flex relative xl:gap-16 gap-8 xl:justify-start justify-between xl:flex-row lg:flex-col flex-row">
          <div className="flex xl:gap-16 gap-8 flex-row">
            <form className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-hash text-[#E0E0E0]"
                >
                  <line x1="4" x2="20" y1="9" y2="9" />
                  <line x1="4" x2="20" y1="15" y2="15" />
                  <line x1="10" x2="8" y1="3" y2="21" />
                  <line x1="16" x2="14" y1="3" y2="21" />
                </svg>
              </div>
              <input
                type="text"
                value={invoiceNumber as string}
                onChange={(e) => {
                  setInvoiceNumber(e.target.value);
                  if (status) {
                    setStatus(null);
                  }
                }}
                id="input-group-1"
                className="bg-gray-50 border border-gray-400 border-search text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                placeholder="Invoice Number"
              />
            </form>

            <Dropdown
              selectStatus={(val: string) => {
                setStatus(val);
                if (invoiceNumber) {
                  setInvoiceNumber("");
                }
              }}
              reset={status === null}
            />
          </div>

          <button
            disabled={isLoading || searching}
            onClick={(e) => {
              e.preventDefault();
              searchAction();
            }}
            className="py-2.5 h-max w-max hover:bg-primary/90 transition-all ease-in duration-300 px-12 rounded-lg text-white font-semibold bg-primaryLight"
          >
            {searching ? "Searching..." : "Search"}
          </button>

          {(invoiceNumber?.length > 0 || status) && (
            <p
              onClick={() => {
                setInvoiceNumber("");
                setStatus(null);
                setIsSearch(false);
                refetch();
              }}
              className="underline text-blue-500 cursor-pointer font-medium text-xs absolute left-2 bottom-0"
            >
              Reset filters
            </p>
          )}
        </div>
      </section>
      <div className="w-auto">
        <div className="mt-8">
          <div className="-mx-4 -my-2 overflow-x-hidden sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-lg bg-white px-2">
                <table className="min-w-full divide-y divide-primaryLight">
                  <thead className="bg-[#f9fafb]">
                    <tr className="text-sm font-medium shadow text-[#000000]">
                      <th className="min-w-[12rem]  px-3 py-3.5 text-left">
                        Invoice
                      </th>
                      <th className="px-3 py-3.5 text-left">Amount</th>
                      <th className="px-3 py-3.5 text-left lg:table-cell hidden">
                        Status
                      </th>
                      <th className="px-3 py-3.5 text-left xl:table-cell hidden">
                        Created
                      </th>
                      <th className="px-3 py-3.5 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-500">
                    {!isLoading &&
                      allInvoices?.map((token: InvoiceProps, i: number) => (
                        <tr
                          key={i}
                          onClick={() =>
                            router.push(`/transactions/${token?.id}`)
                          }
                          className="cursor-pointer hover:bg-gray-50 px-4"
                        >
                          <td className="whitespace-nowrap px-3 border-b-[1px] border-gray-100 py-4 text-sm">
                            <div className="w-full flex flex-col">
                              {token?.invoiceNumber}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 font-medium py-4 border-b-[1px] border-gray-100 text-sm">
                            {thousandSeparator(token?.amount)} {token?.currency}
                          </td>
                          <td
                            className={`whitespace-nowrap px-3 border-b-[1px] border-gray-100 py-4 text-xs lg:table-cell hidden `}
                          >
                            <div
                              className={`w-max h-max px-4 py-1 rounded-3xl ${getStatus(
                                token?.status === "PENDING_APPROVAL" &&
                                  nonApiStatus !== "PAYOUT_INITIATED"
                                  ? "PENDING_APPROVAL".toLowerCase()
                                  : token?.paymentStatus.toLowerCase()
                              )}`}
                            >
                              {token?.status === "PENDING_APPROVAL" &&
                              nonApiStatus !== "PAYOUT_INITIATED"
                                ? "PENDING_APPROVAL"
                                : token?.paymentStatus}
                            </div>
                          </td>
                          <td
                            className={`hidden whitespace-nowrap px-3 border-b-[1px] border-gray-100 py-4 text-sm xl:table-cell`}
                          >
                            {formatDate(token?.createdAt)}
                          </td>
                          <td
                            className={`whitespace-nowrap px-3 border-b-[1px] border-gray-100 py-4 text-sm`}
                          >
                            <div
                              className={`w-max h-max px-8 hover:underline hover:bg-blue-200 py-1 rounded-3xl bg-blue-100 text-blue-900`}
                            >
                              View
                            </div>
                          </td>
                        </tr>
                      ))}
                    {isLoading &&
                      [...Array(15)].map((_, index) => (
                        <LoadingRow colSpan={5} key={index} />
                      ))}
                    {allInvoices?.length === 0 && !isLoading && (
                      <EmptyState
                        colSpan={4}
                        message="No transcations available"
                      />
                    )}
                  </tbody>
                </table>
              </div>

              {!isLoading && (
                <nav
                  className="isolate inline-flex mt-8 -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  {totalPages > 1 && (
                    <button
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      onClick={() => handlePageClick(page - 1)}
                      disabled={page === 0} // Disable the button if on the first page
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}

                  <button
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center ${
                      page === 0
                        ? "bg-primary text-white" // Highlight the current page
                        : "text-gray-900"
                    } px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    onClick={() => handlePageClick(0)}
                  >
                    1
                  </button>

                  {range(
                    Math.max(1, page - numPagesAfterDots),
                    Math.min(totalPages - 1, page + numPagesAfterDots)
                  ).map((pg) => (
                    <button
                      key={pg}
                      className={`relative inline-flex items-center ${
                        pg === page
                          ? "z-10 bg-primary text-white" // Highlight the current page
                          : "text-gray-900"
                      } px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                      onClick={() => handlePageClick(pg)}
                    >
                      {pg + 1}
                    </button>
                  ))}
                  {/* Show ellipsis (...) and the last 3 pages */}
                  {totalPages > 3 && (
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                      ...
                    </span>
                  )}

                  {/* Show last 2 pages */}
                  {totalPages > 2 && (
                    <>
                      <button
                        className={`relative hidden items-center px-4 py-2 text-sm font-semibold ${
                          page === totalPages - 3
                            ? "z-10 bg-primary text-white" // Highlight the current page
                            : "text-gray-900"
                        } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex`}
                        onClick={() => handlePageClick(totalPages - 3)}
                      >
                        {totalPages - 3}
                      </button>
                      <button
                        className={`relative hidden items-center px-4 py-2 text-sm font-semibold ${
                          page === totalPages - 2
                            ? "z-10 bg-primary text-white" // Highlight the current page
                            : "text-gray-900"
                        } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 md:inline-flex`}
                        onClick={() => handlePageClick(totalPages - 2)}
                      >
                        {totalPages - 2}
                      </button>
                      <button
                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 font-semibold text-sm text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                          page === totalPages - 1
                            ? "bg-primary text-white" // Highlight the current page
                            : "text-gray-900"
                        }`}
                        onClick={() => handlePageClick(totalPages - 1)}
                      >
                        {totalPages - 1}
                      </button>
                    </>
                  )}

                  {totalPages > 1 && (
                    <button
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
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
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export function getStatus(status: string) {
  if (status === "paid") {
    return "bg-green-100 text-green-800";
  } else if (status === "payout_initiated") {
    return "bg-yellow-100 text-yellow-800";
  } else if (status === "settled") {
    return "bg-green-200 text-green-800";
  } else if (status === "pending_approval") {
    return "bg-blue-200 text-blue-700";
  } else {
    return "bg-gray-100 text-gray-800";
  }
}

export function Dropdown({
  selectStatus,
  reset,
}: {
  selectStatus: (status: string) => void;
  reset: boolean;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeText, setActiveText] = useState("Choose status");

  useEffect(() => {
    if (reset) {
      setActiveText("Choose status");
    }
  }, [reset]);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setShowDropdown(false));

  return (
    <div
      ref={ref}
      className="relative hidden lg:inline-block w-[275px] text-left"
    >
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }}
          className="inline-flex w-full justify-between transition-all ease-in duration-300 gap-x-4 rounded-md bg-white px-[2.5rem] py-2.5 text-base font-medium text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {activeText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="-mr-1 h-5 w-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-0 rounded-md">
                <p
                  onClick={() => {
                    selectStatus("PAID");
                    setActiveText("PAID");
                    setShowDropdown(false);
                  }}
                  className="hover:bg-gray-100 cursor-pointer rounded-md"
                >
                  <span className={"  block px-4 py-2 text-sm"}>PAID</span>
                </p>
                <p
                  onClick={() => {
                    selectStatus("PAYOUT_INITIATED");
                    setActiveText("PAYOUT INITIATED");
                    setShowDropdown(false);
                  }}
                  className="hover:bg-gray-100 cursor-pointer rounded-md"
                >
                  <span className={"  block px-4 py-2 text-sm"}>
                    PAYOUT INITIATED
                  </span>
                </p>
                <p
                  onClick={() => {
                    selectStatus("PENDING_APPROVAL");
                    setActiveText("PENDING APPROVAL");
                    setShowDropdown(false);
                  }}
                  className="hover:bg-gray-100 cursor-pointer rounded-md"
                >
                  <span className={" block px-4 py-2 text-sm"}>
                    PENDING APPROVAL
                  </span>
                </p>
                <p
                  onClick={() => {
                    selectStatus("SETTLED");
                    setActiveText("SETTLED");
                    setShowDropdown(false);
                  }}
                  className="hover:bg-gray-100 cursor-pointer rounded-md"
                >
                  <span className={"  block px-4 py-2 text-sm"}>SETTLED</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
