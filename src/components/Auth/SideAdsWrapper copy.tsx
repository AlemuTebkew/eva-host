"use client";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface SideAdsWrapperProps {
  children: ReactNode;
}

const SideAdsWrapper = ({ children }: SideAdsWrapperProps) => {
  const query = useSearchParams();
  const styleQuery = query.get("style");
  const styleType = ["1", "2", "3"];
  const [style, setStyle] = useState<string>(styleQuery || styleType[0]);

  useEffect(() => {
    setStyle(styleQuery || styleType[0]);
  }, [styleQuery]);
  return (
    <>
      {style === "1" && (
        <div className="flex flex-col justify-between md:flex-row md:flex-nowrap ">
          {/* Left Ad - Vertically Centered */}
          <div className="hidden p-4 md:block">
            <Image
              src="/images/left-ads.png"
              alt="Left Ad"
              width={150}
              height={2000}
              className="min-h-[500px] object-cover"
            />
          </div>

          <div className="md:hidden p-2">
            <Image
              src="/images/left-ads.png"
              alt="Left Ad"
              width={700}
              height={200}
              className="max-h-[100px] object-cover"
            />
          </div>

          {/* Main Content */}
          {/* <div className="flex-1 flex flex-col justify-between"> */}
          <div className="flex w-full flex-col justify-between">
            <div className="z-10 mx-auto h-full w-full ">{children}</div>

            <div className="flex justify-center p-5">
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
          <div className="  hidden p-5 md:block">
            <Image
              src="/images/right-ads.png"
              alt="Right Ad"
              width={150}
              height={500}
              className="min-h-[500px] object-cover"
            />
          </div>
        </div>
      )}

      {style === "2" && (
        <div className="">
          {/* Left Ad - Vertically Centered */}
          <div className="fixed left-5 top-1/2 hidden -translate-y-1/2 md:block">
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
              className="max-h-[100px] object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="">
            <div className=" z-10 mx-auto w-full md:w-4/6">{children}</div>

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
          <div className="fixed right-5 top-1/2 hidden -translate-y-1/2 md:block">
            <Image
              src="/images/right-ads.png"
              alt="Right Ad"
              width={150}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SideAdsWrapper;
