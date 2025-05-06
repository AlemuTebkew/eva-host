import SideAdsWrapper from "@/components/Auth/SideAdsWrapper";
import Footer from "@/components/Footer1";
import Navbar from "@/components/Navigation";
import SearchResultPage from "@/components/Search/SearchPage";
import { Suspense } from "react";

const SearchPage = () => {
  return (
    <>
      {/* <Navbar /> */}
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
      {/* <Footer/> */}
    </>
  );
};

export default SearchPage;
