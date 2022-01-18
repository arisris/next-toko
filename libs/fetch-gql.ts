import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { BaseQueryFn, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";

export function fetchBaseGraphQL(args: FetchBaseQueryArgs = {}) {
  return fetchBaseQuery({
    baseUrl: "/api/graphql",
    method: "POST",
    ...args
  });
}

export function createFetchOption(
  body: { query?: string; mutation?: string; variables?: object },
  options: FetchArgs = {
    url: ""
  }
) {
  return {
    method: "POST",
    body,
    async responseHandler(res) {
      const json = await res.json();

      if (json.errors) return json;
      return json.data;
    },
    ...options
  };
}
