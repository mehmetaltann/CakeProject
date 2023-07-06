import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1623/" }),
  tagTypes: [
    "Budget",
    "Investment",
    "Portfolios",
    "Category",
    "Summary",
    "Record",
    "Parameter",
  ],
  endpoints: () => ({}),
});

/*  http://localhost:1623/ */
