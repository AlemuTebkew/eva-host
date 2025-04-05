import { Category } from "@/types/category";
import { Product } from "@/types/product";
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

    search: builder.query<Product[], QueryRequest>({
      query: (queryRequest) => ({
        url: "/user/products/search",
        method: "GET",
        params: queryRequest.params
      }),
      transformResponse: (response: { status: boolean; message: string; data: Product[] }) => {
        return response.data;
      },
    }),
  }),
});


export const { 
  useGetCategoriesQuery,
  useSearchQuery
} = appApi;