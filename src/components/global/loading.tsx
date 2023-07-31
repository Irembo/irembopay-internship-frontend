import React from "react";

export default function Loading() {
  return (
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
}

export function LoadingRow({ colSpan }: { colSpan: number }) {
  return (
    <tr className="">
      {[...Array(colSpan)].map((_, index) => (
        <td
          key={index}
          className="animate-pulse whitespace-nowrap bg-gray-100 first:rounded-l-xl last:rounded-r-xl px-4 py-6 text-sm text-white"
        ></td>
      ))}
    </tr>
  );
}

export function EmptyState({
  colSpan,
  message,
}: {
  colSpan: number;
  message: string;
}) {
  return (
    <tr className="px-4">
      <td
        colSpan={colSpan}
        className="flex w-full text-center whitespace-nowrap px-4 py-6 text-sm text-[#9D9D9D]"
      >
        {message}
      </td>
    </tr>
  );
}
