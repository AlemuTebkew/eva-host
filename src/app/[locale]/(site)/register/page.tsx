import { Suspense } from "react";
import Registration from "@/components/Auth/Registration";
import SideAdsWrapper from "@/components/Auth/SideAdsWrapper";

const RegisterPage = () => {
  return (
    <SideAdsWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <Registration />
      </Suspense>
    </SideAdsWrapper>
  );
};

export default RegisterPage;
