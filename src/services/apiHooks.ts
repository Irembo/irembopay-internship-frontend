import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

export const apiHooks = createApi({
  baseQuery,
  tagTypes: ["Dashboard", "Invoices", "Payouts"],
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: ({ accountId, page = 1 }) => ({
        url: `payment-invoice?accountId=${accountId}&page=${page}`,
      }),
    }),
    getPayouts: builder.query({
      query: (accountId, page = 1) => ({
        url: `settlement-transaction?accountId=${accountId}&page=${page}`,
      }),
    }),
    getPaymentAccountPayouts: builder.query({
      query: ({ accountNumber, page = 1 }) => ({
        url: `settlement-transaction/${accountNumber}?page=${page}`,
      }),
    }),
    getPaymentAccounts: builder.query({
      query: (accountId) => ({
        url: `payment-account?accountId=${accountId}`,
      }),
    }),
    getTotalPaidInvoices: builder.query({
      query: (accountId) => ({
        url: `account-statistics/total-paid-invoices/${accountId}`,
      }),
    }),
    getTranscationValueLast7Days: builder.query({
      query: (accountNumber) => ({
        url: `account-statistics/total-transaction-value-last-7-days/${accountNumber}`,
      }),
    }),
    getTranscationValueLast30Days: builder.query({
      query: (accountNumber) => ({
        url: `account-statistics/total-transaction-value-last-30-days/${accountNumber}`,
      }),
    }),
    averageTranscationValueDaily: builder.query({
      query: (accountId) => ({
        url: `account-statistics/average-daily-transaction-value/${accountId}`,
      }),
    }),
    getBalance: builder.query({
      query: (accountId) => ({
        url: `account-statistics/balance/${accountId}`,
      }),
    }),
    getBalancePaymentAccount: builder.query({
      query: ({ accountId, accountNumber }) => ({
        url: `account-statistics/balance/payment-account/${accountId}/${accountNumber}`,
      }),
    }),
    get30DaysTotalPaid: builder.query({
      query: ({ accountId, accountNumber }) => ({
        url: `account-statistics/total-paid-invoices-for-payment-account/${accountId}/${accountNumber}`,
      }),
    }),
    getProjectedBalance: builder.query({
      query: (accountId) => ({
        url: `account-statistics/projected-balance/${accountId}`,
      }),
    }),
    getDailyPaidInvoices: builder.query({
      query: ({ accountId, activeCycleInvoices = 100 }) => ({
        url: `account-statistics/total-transcations/${accountId}/${activeCycleInvoices}`,
      }),
    }),
    getDailySettledPayouts: builder.query({
      query: ({ accountId, activeCyclePayouts = 100 }) => ({
        url: `account-statistics/total-settled-transcations/${accountId}/${activeCyclePayouts}`,
      }),
    }),
    getOneInvoice: builder.query({
      query: (id) => ({
        url: `payment-invoice/invoice-number?invoiceId=${id}`,
      }),
    }),
    searchForTranscation: builder.query({
      query: ({ accountId, search }) => ({
        url: `payment-invoice/search/${accountId}?search=${search}`,
      }),
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetPayoutsQuery,
  useGetPaymentAccountsQuery,
  useGetTotalPaidInvoicesQuery,
  useGetTranscationValueLast7DaysQuery,
  useGetTranscationValueLast30DaysQuery,
  useAverageTranscationValueDailyQuery,
  useGetBalanceQuery,
  useGetProjectedBalanceQuery,
  useGetDailyPaidInvoicesQuery,
  useGetDailySettledPayoutsQuery,
  useGetOneInvoiceQuery,
  useGetBalancePaymentAccountQuery,
  useGet30DaysTotalPaidQuery,
  useGetPaymentAccountPayoutsQuery,
  useSearchForTranscationQuery,
} = apiHooks;
