'use client'
import Image from "next/image"
import { ReactNode } from "react"

interface SideAdsWrapperProps {
  children: ReactNode
}

const SideAdsWrapper = ({ children }: SideAdsWrapperProps) => {
  return (
    <>
      {/* Left Ad - Vertically Centered */}
      <div className="fixed left-0 top-1/2 hidden md:block -translate-y-1/2">
        <Image
          src="/images/left-ads.png"
          alt="Left Ad"
          width={150}
          height={500}
          className="object-cover"
        />
      </div>

      <div className="md:hidden ">
        <Image
          src="/images/left-ads.png"
          alt="Left Ad"
          width={700}
          height={200}
          className="object-cover max-h-[100px]"
        />
      </div>

      {/* Main Content */}
      <div>
      <div className="relative z-10 w-full mx-auto md:w-4/6">
        {children}
      </div>

      <div className="flex justify-center">
        <Image
          src="/images/bottom-ads.png"
          alt="Right Ad"
          width={750}
          height={500}
          className="object-cover"
        />
      </div>
      </div>
    
      {/* Right Ad - Vertically Centered */}
      <div className="fixed right-0 top-1/2 hidden md:block -translate-y-1/2">
        <Image
          src="/images/right-ads.png"
          alt="Right Ad"
          width={150}
          height={500}
          className="object-cover"
        />
      </div>
    </>
  )
}

export default SideAdsWrapper
