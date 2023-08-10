import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1623/" }),
  tagTypes: [
    "Materials",
    "SemiProducts",
    "Products",
    "Customers",
    "Orders",
    "Parameter",
  ],
  endpoints: () => ({}),
});

//"http://localhost:1623/"
//"https://cakeproject.onrender.com/"