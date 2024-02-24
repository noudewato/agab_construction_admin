import { LANDPROPERTY_URL } from "../apiRoutes";
import { apiSlice } from "./apiSlice";

const landPropertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLandProperties: builder.query({
      query: () => ({
        url: `${LANDPROPERTY_URL}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["LandProperty"],
    }),
    getLandPropertyDetails: builder.query({
      query: (landPropertyDetailsId) => ({
        url: `${LANDPROPERTY_URL}${landPropertyDetailsId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createLandProperty: builder.mutation({
      query: (data) => ({
        url: `${LANDPROPERTY_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LandProperty"],
    }),
    updateLandProperty: builder.mutation({
      query: (data) => ({
        url: `${LANDPROPERTY_URL}${data.landPropertyId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["LandProperty"],
    }),
    deleteLandProperty: builder.mutation({
      query: (landPropertyId) => ({
        url: `${LANDPROPERTY_URL}${landPropertyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LandProperty"],
    }),
  }),
});

export const {
  useGetLandPropertiesQuery,
  useGetLandPropertyDetailsQuery,
  useCreateLandPropertyMutation,
  useUpdateLandPropertyMutation,
  useDeleteLandPropertyMutation,
} = landPropertyApiSlice;
