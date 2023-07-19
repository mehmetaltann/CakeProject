import { baseApi } from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `urun-sorgula`,
      providesTags: ["Products"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    addProduct: builder.mutation({
      query: (postData) => ({
        url: `urun-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `urun-guncelle/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `urun-sil/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    addMaterialToProduct: builder.mutation({
      query(body) {
        return {
          url: `urun-malzeme-ekle`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteMaterialFromProduct: builder.mutation({
      query(body) {
        return {
          url: `urun-malzeme-sil`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    addSemiProductToProduct: builder.mutation({
      query(body) {
        return {
          url: `urun-tarif-ekle`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteSemiProductFromProduct: builder.mutation({
      query(body) {
        return {
          url: `urun-tarif-sil`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddMaterialToProductMutation,
  useDeleteMaterialFromProductMutation,
  useAddSemiProductToProductMutation,
  useDeleteSemiProductFromProductMutation,
} = productApi;
