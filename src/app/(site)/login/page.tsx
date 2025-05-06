'use client';

import { Suspense } from "react";
import Login from "@/components/Auth/Login";
import SideAdsWrapper from "@/components/Auth/SideAdsWrapper";

const LoginPage = () => {
  return (
    <SideAdsWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    </SideAdsWrapper>
  );
};

export default LoginPage;
