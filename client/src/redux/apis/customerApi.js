import { baseApi } from "../baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => `musteri-sorgula`,
      providesTags: ["Customers"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    addCustomer: builder.mutation({
      query: (postData) => ({
        url: `musteri-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Customers"],
    }),
    updateCustomer: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `musteri-guncelle/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Customers"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `musteri-sil/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"],
    }),
    deleteOrderFromCustomer: builder.mutation({
      query(body) {
        return {
          url: `musteri-siparis-sil`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useDeleteOrderFromCustomerMutation,
} = customerApi;
