import { Category } from "@/types/category";
import { MetaData, PorductFilterResponse, Product } from "@/types/product";
import { QueryRequest } from "@/types/queryRequest";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://13.60.253.93:5007" }), // Change this to your API
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/user/categories",
        method: "GET",
      }),
      transformResponse: (response: { status: boolean; message: string; data: Category[] }) => {
        return response.data;
      },
    }),
    filterProducts: builder.query<PorductFilterResponse, QueryRequest>({
      query: (queryRequest) => ({
        url: "/user/products",
        method: "GET",
        params: queryRequest.params
      }),
      transformResponse: (response: { status: boolean; message: string; data: Product[], meta: MetaData }) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getProductDetail: builder.query<Product, string>({
      query: (slug) => ({
        url: `/user/products/${slug}`,
        method: "GET",
      }),
      transformResponse: (response: { status: boolean; message: string; data: Product }) => {
        return response.data;
      }
    }),
    getSearchSuggestion: builder.query<string[], QueryRequest>({
      query: (queryRequest) => ({
        url: `/user/products/search`,
        method: "GET",
        params: queryRequest.params
      }),
      transformResponse: (response: { status: boolean; message: string; data: string[] }) => {
        return response.data
      }
    })
  }),
});


export const { 
  useGetCategoriesQuery,
  useFilterProductsQuery,
  useGetProductDetailQuery,
  useLazyGetSearchSuggestionQuery
} = appApi;