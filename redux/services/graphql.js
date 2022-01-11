import { createFetchOption, fetchBaseGraphQL } from "@/libs/fetch-gql";
import { createApi } from "@reduxjs/toolkit/query/react";

export const graphqlApi = createApi({
  reducerPath: "graphqlApi",
  baseQuery: fetchBaseGraphQL(),
  tagTypes: ["SIMPLE_QUERY"],
  endpoints: (build) => ({
    simple: build.query({
      query: (query) => createFetchOption({
        query: `{ ${query} }`
      }),
      providesTags: () => [{ type: "SIMPLE_QUERY" }]
    })
  })
});

export const { useSimpleQuery, useLazySimpleQuery } = graphqlApi;
