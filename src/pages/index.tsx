import Header from "@/components/global/head";
import Wrapper from "@/components/global/wrapper";
import { formatToK } from "@/lib/formatters";
import {
  useGetBalanceQuery,
  useGetProjectedBalanceQuery,
  useGetTotalPaidInvoicesQuery,
} from "@/services/apiHooks";

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

  return (
    <>
      <Header />
      <Wrapper>
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
    <div className="bg-white relative rounded-xl p-4 shadow-md w-[300px] items-start justify-start gap-8 flex">
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
    </div>
  );
}

function IsLoadingOneStat() {
  return (
    <div className="animate-pulse whitespace-nowrap w-[225px] bg-gray-400 h-28 rounded-xl"></div>
  );
}
