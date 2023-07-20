import { formatDate, thousandSeparator } from "@/lib/formatters";
import { useGetInvoicesQuery } from "@/services/apiHooks";
import React from "react";
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
  const { data, isLoading } = useGetInvoicesQuery(accountId);

  const router = useRouter();

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
                          onClick={() => router.push(`/invoice/${token?.id}`)}
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
