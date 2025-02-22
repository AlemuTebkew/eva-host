import { Partner } from "@/types/partner";
import { Service } from "@/types/service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://ec2-16-171-239-43.eu-north-1.compute.amazonaws.com:5006" }), // Change this to your API
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => ({
        url: "/api/services",
        method: "GET",
      })
    }),
    getPartners: builder.query<Partner[], void>({
      query: () => ({
        url: "/api/partners",
        method: "GET",
      })
    }),
    getCategory: builder.query<any[], void>({
      query: () => ({
        url: "/api/categories",
        method: "GET",
      })
    }),
    getProducts: builder.query<any[], void>({
      query: () => ({
        url: "/api/products",
        method: "GET",
      })
    })
  }),
});

export const { 
  useGetServicesQuery,
  useGetPartnersQuery ,
  useGetCategoryQuery,
  useGetProductsQuery
} = appApi;
