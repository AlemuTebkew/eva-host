"use client";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface SideAdsWrapperProps {
  children: ReactNode;
}

interface AdItem {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
}

const FILE_BASE = "http://16.171.71.23:5007/files";
const API_URL = "http://16.171.71.23:5007/user/vendor_ads";

type AdSlot = "left" | "right" | "bottom";

const SideAdsWrapper = ({ children }: SideAdsWrapperProps) => {
  const query = useSearchParams();
  const styleQuery = query.get("style");
  const style = ["1", "2", "3"].includes(styleQuery || "") ? styleQuery! : "1";

  const [ads, setAds] = useState<AdItem[]>([]);
  const [indices, setIndices] = useState<Record<AdSlot, number>>({
    left: 0,
    right: 0,
    bottom: 0,
  });

  // Fetch ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        if (json.status && Array.isArray(json.data)) {
          setAds(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch ads:", err);
      }
    };

    fetchAds();
  }, []);

  // Rotate ads every 4 seconds randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) => {
        const next: Record<AdSlot, number> = { ...prev };

        ["left", "right", "bottom"].forEach((slot) => {
          const count = ads.length;
          if (count > 1) {
            let newIndex = Math.floor(Math.random() * count);
            while (newIndex === prev[slot]) {
              newIndex = Math.floor(Math.random() * count);
            }
            next[slot] = newIndex;
          }
        });

        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [ads]);

  const getAdUrl = (bannerImage: string) => `${FILE_BASE}/${bannerImage}`;

  const AdImage = ({
    slot,
    mobile = false,
  }: {
    slot: AdSlot;
    mobile?: boolean;
  }) => {
    const ad = ads[indices[slot]];
    if (!ad) return null;

    const imageUrl = getAdUrl(ad.bannerImage);

    if (slot === "bottom") {
      return (
        <Image
          src={imageUrl}
          alt={ad.title}
          width={700}
          height={200}
          className={`max-h-[200px] object-cover`}
        />
      );
    } else {
      return (
        <Image
          src={imageUrl}
          alt={ad.title}
          width={mobile ? 700 : 150}
          height={mobile ? 200 : 500}
          className={`${mobile ? "max-h-[100px]" : "min-h-[500px]"} object-cover`}
        />
      );
    }
  };

  return (
    <>
      {style === "1" && (
        <div className="flex flex-col justify-between md:flex-row md:flex-nowrap">
          <div className="hidden p-4 md:block">
            <AdImage slot="left" />
          </div>
          <div className="p-2 md:hidden">
            <AdImage slot="left" mobile />
          </div>

          <div className="flex w-full flex-col justify-between">
            <div className="z-10 mx-auto h-full w-full ">{children}</div>
            <div className="flex flex-col md:flex-row justify-between  p-5 gap-2">
              <AdImage slot="bottom" />
              <AdImage slot="bottom" />
              <AdImage slot="bottom" />
            </div>
          </div>

          <div className="hidden p-5 md:block">
            <AdImage slot="right" />
          </div>
        </div>
      )}

      {style === "2" && (
        <div>
          <div className="fixed left-5 top-1/2 hidden -translate-y-1/2 md:block">
            <AdImage slot="left" />
          </div>
          <div className="p-2 md:hidden">
            <AdImage slot="left" mobile />
          </div>

          <div className="">
            <div className="z-10 mx-auto w-full md:w-4/6">{children}</div>
            <div className="flex justify-center">
              <AdImage slot="bottom" />
            </div>
          </div>

          <div className="fixed right-5 top-1/2 hidden -translate-y-1/2 md:block">
            <AdImage slot="right" />
          </div>
        </div>
      )}
    </>
  );
};

export default SideAdsWrapper;
