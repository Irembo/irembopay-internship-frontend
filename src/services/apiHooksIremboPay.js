import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_IREMBOPAY,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiHooksIremboPay = createApi({
  baseQuery,
  tagTypes: ["User", "Dashboard", "Programs", "ProgramView", "TalentView"],
  endpoints: (builder) => ({
    joinWaitlist: builder.mutation({
      query: (email) => ({
        url: `waitlist`,
        method: "POST",
        body: {
          email,
        },
      }),
    }),

  }),
});

export const {
  useJoinWaitlistMutation,
} = apiHooksIremboPay;
