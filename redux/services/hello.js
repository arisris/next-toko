import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const helloApi = createApi({
  reducerPath: "helloApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (build) => ({
    say: build.query({
      query: () => ({
        url: "hello"
      })
    })
  })
})

export const {
  useSayQuery
} = helloApi;