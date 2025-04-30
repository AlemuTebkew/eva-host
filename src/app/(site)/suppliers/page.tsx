import Footer from "@/components/Footer"
import Navbar from "@/components/Navigation"
import SearchResultPage from "@/components/Search/SearchPage"
import SupplierListPage from "@/components/Suppliers/SupplierListPage"
import { Suspense } from "react"

const SupplierPage = () => {
  return (
    <>
      <Navbar/>
      <Suspense fallback={<div>Loading</div>}>
      <SupplierListPage/>
      </Suspense>
      
      {/* <Footer/> */}
    </>
  )
}

export default SupplierPage