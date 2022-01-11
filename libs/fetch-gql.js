import { fetchBaseQuery } from "@reduxjs/toolkit/query";

/** @param {import("@reduxjs/toolkit/dist/query").BaseQueryFn<import("@reduxjs/toolkit/dist/query/fetchBaseQuery").FetchBaseQueryArgs>} args */
export function fetchBaseGraphQL(args = {}) {
  return fetchBaseQuery({
    baseUrl: "/api/graphql",
    method: "POST",
    ...args
  })
}

/** 
 * @param {{query?: string, mutation?: string, variables: object}} body
 * @param {import("@reduxjs/toolkit/dist/query").FetchArgs} options
 * @returns {import("@reduxjs/toolkit/dist/query").FetchArgs}
 */
export function createFetchOption(body, options) {
  return {
    method: "POST",
    body,
    async responseHandler(res) {
      const json = await res.json();
      
      if (json.errors) return json;
      return json.data;
    },
    ...options
  }
}