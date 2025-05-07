'use client';
export const runtime = "nodejs"   // or "edge" if you prefer

import { Suspense } from "react";
// import Login from "@/components/Auth/Login";
import SideAdsWrapper from "@/components/Auth/SideAdsWrapper";
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/components/Auth/Login'), { ssr: false });

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>

    <SideAdsWrapper>
        <Login />
      </SideAdsWrapper>
    </Suspense>
  );
};

export default LoginPage;
