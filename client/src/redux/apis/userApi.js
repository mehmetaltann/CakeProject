import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAuth: builder.mutation({
      query: (postData) => ({
        url: `/authUser`,
        method: "POST",
        body: postData,
      }),
    }),
    addUser: builder.mutation({
      query: (postData) => ({
        url: `/postUser`,
        method: "POST",
        body: postData,
      }),
    }),
  }),
});

export const { useAddAuthMutation, useAddUserMutation } = userApi;
