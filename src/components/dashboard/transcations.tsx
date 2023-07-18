import { formatToK } from "@/lib/formatters";
import { useGetInvoicesQuery } from "@/services/apiHooks";
import React from "react";
import { EmptyState, LoadingRow } from "../global/loading";

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

  return (
    <div className="">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-lg bg-white px-0">
              <table className="min-w-full divide-y divide-primaryLight">
                <thead className="bg-[#f9fafb]">
                  <tr className="text-sm font-[300] shadow text-[#000000]">
                    <th className="min-w-[12rem]  px-3 py-3.5 text-left">
                      Invoice Number
                    </th>
                    <th className="px-3 py-3.5 text-left">Amount</th>
                    <th className="px-3 py-3.5 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500">
                  {!isLoading &&
                    data?.content.map((token: InvoiceProps, i: number) => (
                      <tr key={i} className="cursor-pointer px-4">
                        <td className="whitespace-nowrap px-3 border-b-[1px] border-gray-100 py-4 text-sm">
                          {token?.invoiceNumber}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 border-b-[1px] border-gray-100 text-sm">
                          {token?.currency} {formatToK(token?.amount)}
                        </td>
                        <td className="hidden whitespace-nowrap px-3 border-b-[1px] border-gray-100 py-4 text-sm lg:table-cell">
                          {token?.paymentStatus}
                        </td>
                      </tr>
                    ))}
                  {isLoading &&
                    [...Array(5)].map((_, index) => (
                      <LoadingRow colSpan={3} key={index} />
                    ))}
                  {data?.content?.length === 0 && (
                    <EmptyState colSpan={3} message="No tokens available" />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
