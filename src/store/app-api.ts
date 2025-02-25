import { Partner } from "@/types/partner";
import { Product, ProductQueryRequest, ProductResponse } from "@/types/product";
import { Service } from "@/types/service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5006" }), // Change this to your API
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
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/api/products",
        method: "GET",
      })
    }),
    getProductsWithPrice: builder.query<ProductResponse, ProductQueryRequest>({
      query: ({ search, limit, page }) => ({
        url: "/api/product_price",
        params: { search, limit, page },
      }),
    }),
  }),
});

export const { 
  useGetServicesQuery,
  useGetPartnersQuery ,
  useGetCategoryQuery,
  useGetProductsQuery,
  useGetProductsWithPriceQuery
} = appApi;
