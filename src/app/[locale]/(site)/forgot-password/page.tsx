"use client";

import { Suspense } from "react";
import SideAdsWrapper from "@/components/Auth/SideAdsWrapper";
import dynamic from "next/dynamic";
import Loading from "@/app/[locale]/loading";
const Forgot = dynamic(() => import("@/components/Auth/Forgot"), {
  ssr: false,
});

const ForgotPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SideAdsWrapper>
        <Forgot />
      </SideAdsWrapper>
    </Suspense>
  );
};

export default ForgotPage;
