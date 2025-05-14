import SideAdsWrapper from "@/components/Auth/SideAdsWrapper";

import SearchResultPage from "@/components/Search/SearchPage";
import { Suspense } from "react";

const SearchPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <SideAdsWrapper>
          <SearchResultPage />
        </SideAdsWrapper>
      </Suspense>
    </>
  );
};

export default SearchPage;
