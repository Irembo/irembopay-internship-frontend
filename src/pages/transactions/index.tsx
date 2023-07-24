import { formatDate, thousandSeparator } from "@/lib/formatters";
import { useGetInvoicesQuery } from "@/services/apiHooks";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { EmptyState, LoadingRow } from "@/components/global/loading";
import Wrapper from "@/components/global/wrapper";
import Header from "@/components/global/head";

export interface InvoiceProps {
  id: string;
  currency: string;
  invoiceNumber: string;
  amount: number;
  createdAt: string;
  expiryAt: string;
  paymentStatus: string;
}

export default function Transcations() {
  const accountId = "767c9673-298a-4e1d-b325-eb44577494d8";

  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useGetInvoicesQuery({ accountId, page });

  const router = useRouter();

  const totalPages = data?.totalPages;

  useEffect(() => {
    if (data?.number) {
      setPage(data?.number);
    }
  }, [data?.number]);

  // Helper function to generate an array of numbers from start to end
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Helper function to handle pagination click
  const handlePageClick = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(pageNumber);
  };

  // Number of pages to show after "..." (in this case, it's 3)
  const numPagesAfterDots = 2;

  return (
    <Wrapper>
      <Header title="Transactions" />
      <div className="w-auto">
        <div className="mt-8">
          <div className="-mx-4 -my-2 overflow-x-hidden sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-lg bg-white px-0">
                <table className="min-w-full divide-y divide-primaryLight">
                  <thead className="bg-[#f9fafb]">
                    <tr className="text-sm font-medium shadow text-[#000000]">
                      <th className="min-w-[12rem]  px-3 py-3.5 text-left">
                        Invoice
                      </th>
                      <th className="px-3 py-3.5 text-left">Amount</th>
                      <th className="px-3 py-3.5 text-left">Status</th>
                      <th className="px-3 py-3.5 text-left">Created</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-500">
                    {!isLoading &&
                      data?.content.map((token: InvoiceProps, i: number) => (
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
                          <td className="whitespace-nowrap px-3 py-4 border-b-[1px] border-gray-100 text-sm">
                            {thousandSeparator(token?.amount)} {token?.currency}
                          </td>
                          <td
                            className={`hidden whitespace-nowrap px-3 border-b-[1px] border-gray-100 py-4 text-xs lg:table-cell `}
                          >
                            <div
                              className={`w-max h-max px-4 py-0.5 rounded-3xl ${getStatus(
                                token?.paymentStatus.toLowerCase()
                              )}`}
                            >
                              {token?.paymentStatus}
                            </div>
                          </td>
                          <td
                            className={`hidden whitespace-nowrap px-3 border-b-[1px] border-gray-100 py-4 text-sm lg:table-cell`}
                          >
                            {formatDate(token?.createdAt)}
                          </td>
                        </tr>
                      ))}
                    {isLoading &&
                      [...Array(5)].map((_, index) => (
                        <LoadingRow colSpan={4} key={index} />
                      ))}
                    {data?.content?.length === 0 && (
                      <EmptyState colSpan={4} message="No tokens available" />
                    )}
                  </tbody>
                </table>
              </div>

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
                {page === 1 && (
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
                )}

                {range(
                  Math.max(2, page - numPagesAfterDots),
                  Math.min(totalPages - 1, page + numPagesAfterDots)
                ).map((pg) => (
                  <button
                    key={pg}
                    className={`relative inline-flex items-center ${
                      pg === page
                        ? "z-10 bg-primary text-white" // Highlight the current page
                        : "text-gray-900"
                    } px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
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
                {totalPages > 2 && (
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
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

function getStatus(status: string) {
  if (status === "paid") {
    return "bg-green-100 text-green-800";
  } else if (status === "payout_initiated") {
    return "bg-yellow-100 text-yellow-800";
  } else if (status === "settled") {
    return "bg-green-200 text-green-800";
  } else {
    return "bg-gray-100 text-gray-800";
  }
}
