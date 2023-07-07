import { baseApi } from "../baseApi";

export const materialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMaterials: builder.query({
      query: () => `malzeme-sorgula`,
      providesTags: ["Materials"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    addMaterial: builder.mutation({
      query: (postData) => ({
        url: `malzeme-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Materials"],
    }),
    updateMaterial: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `malzeme-guncelle/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Materials"],
    }),
    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `malzeme-sil/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Materials"],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useAddMaterialMutation,
  useDeleteMaterialMutation,
  useUpdateMaterialMutation,
} = materialApi;
