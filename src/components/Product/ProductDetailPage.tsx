'use client';
import React from "react";
import { useParams } from "next/navigation";
import { useGetProductDetailQuery } from "@/store/app-api";
import { HtmlRenderer } from "../HtmlRenderer";
import ProductDetailSkeleton from "../Skeleton/ProductDetailSkeleton";
import ProductImageSlider from "../ImageSlider/CustomImageSlider";
import CustomProductDetail from "./ProductDetail";


const ProductDetailPage = ({
  slug,
}: {slug:string}) => {


  const {data, isLoading, isSuccess} = useGetProductDetailQuery(slug)
  return (
    <div className="max-w-c-1235 mx-auto mt-2 lg:mt-4 px-6 bg-white">
      {
        isLoading && (
          <ProductDetailSkeleton/>
        )
      }
      {
        isSuccess && data && (
          <div className="flex py-8 px-0 ">
            <CustomProductDetail product={data}/>
          </div>
        )
      }
    </div>
  );
};

export default ProductDetailPage