import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";
import SearchResultPage from "@/components/Search/SearchPage";
import { Suspense } from "react";

const SearchPage = () => {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <SearchResultPage />
      </Suspense>
      {/* <Footer/> */}
    </>
  );
};

export default SearchPage;
