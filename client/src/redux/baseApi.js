import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1623/" }),
  tagTypes: ["Materials"],
  endpoints: () => ({}),
});

/*  http://localhost:1623/ */
