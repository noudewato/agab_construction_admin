import { PROPERTY_URL } from "../apiRoutes";
import { apiSlice } from "./apiSlice";

const propertySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProperties: builder.query({
      query: () => ({
        url: PROPERTY_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Property"],
    }), endpoints: (builder) => ({
      getAllProperties: builder.query({
        query: () => ({
          url: PROPERTY_URL,
        }),
        keepUnusedDataFor: 5,
        providesTags: ["Property"],
        onCacheEntryAdded: (cache, entry) => {
          // Check if the cache entry indicates a 304 Not Modified response
          if (entry.response?.status === 304) {
            // Use the cached data
            const cachedData = cache.findEntry(["Property"]);
            // Set the cached data as the query result
            entry.setResult(cachedData?.result);
          }
        },
      }),
      // Define other endpoints...
    }),
    getSingleProperty: builder.query({
      query: (propertyId) => ({
        url: `${PROPERTY_URL}${propertyId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProperty: builder.mutation({
      query: (data) => ({
        url: `${PROPERTY_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Property"],
    }),
    updateProperty: builder.mutation({
      query: (data) => ({
        url: `${PROPERTY_URL}${data.propertyDetailsId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Property"],
    }),
    deleteProperty: builder.mutation({
      query: (propertyId) => ({
        url: `${PROPERTY_URL}${propertyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),
  }),
});

export const {
  useGetAllPropertiesQuery,
  useGetSinglePropertyQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertySlice;
