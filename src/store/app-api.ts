import { Category } from "@/types/category";
import { MetaData, PorductFilterResponse, Product, ProductDetails } from "@/types/product";
import { QueryRequest } from "@/types/queryRequest";
import { Supplier, SupplierFilterResponse } from "@/types/supplier";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://16.171.71.23:5007" }), // Change this to your API
  // baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:5007" }), // Change this to your API
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
    getProductDetail: builder.query<ProductDetails, string>({
      query: (slug) => ({
        url: `/user/products/${slug}`,
        method: "GET",
      }),
      transformResponse: (response: { status: boolean; message: string; data: ProductDetails }) => {
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
    }),
    filterSupplier: builder.query<SupplierFilterResponse, QueryRequest>({
      query: (queryRequest) => ({
        url: "/user/vendors",
        method: "GET",
        params: queryRequest.params
      }),
      transformResponse: (response: { status: boolean; message: string; data: Supplier[], meta: MetaData }) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSupplierDetail: builder.query<Supplier, string>({
      query: (slug) => ({
        url: `/user/vendor_profile/${slug}`,
        method: "GET",
      }),
      transformResponse: (response: { status: boolean; message: string; data: Supplier }) => {
        return response.data;
      }
    }),
  }),
});

export const { 
  useGetCategoriesQuery,
  useFilterProductsQuery,
  useGetProductDetailQuery,
  useLazyGetSearchSuggestionQuery,
  useFilterSupplierQuery,
  useGetSupplierDetailQuery
} = appApi;