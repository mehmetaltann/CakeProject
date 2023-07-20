import { baseApi } from "../baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => `siparis-sorgula`,
      providesTags: ["Orders"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    addOrder: builder.mutation({
      query: (postData) => ({
        url: `siparis-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (body) => ({
        url: `siparis-sil`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    addProductToOrder: builder.mutation({
      query(body) {
        return {
          url: `siparis-urun-ekle`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    deleteProductFromOrder: builder.mutation({
      query(body) {
        return {
          url: `siparis-urun-sil`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useDeleteOrderMutation,
  useAddProductToOrderMutation,
  useDeleteProductFromOrderMutation,
} = orderApi;
