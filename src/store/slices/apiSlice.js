import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "https://agent-server-6ebo.onrender.com" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "LandProperty", "Product", "Property"],
  endpoints: (builder) => ({}),
});
