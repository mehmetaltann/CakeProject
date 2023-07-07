import { baseApi } from "../baseApi";

export const semiProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSemiProducts: builder.query({
      query: () => `tarif-sorgula`,
      providesTags: ["SemiProducts"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    addSemiProduct: builder.mutation({
      query: (postData) => ({
        url: `tarif-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["SemiProducts"],
    }),
    deleteSemiProduct: builder.mutation({
      query: (id) => ({
        url: `tarif-sil/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SemiProducts"],
    }),
    addMaterialToSemiProduct: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `tarif-malzeme-ekle/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["SemiProducts"],
    }),
  }),
});

export const {
  useGetSemiProductsQuery,
  useAddSemiProductMutation,
  useAddMaterialToSemiProductMutation,
  useDeleteSemiProductMutation,
} = semiProductApi;
