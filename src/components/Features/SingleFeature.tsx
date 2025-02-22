import { Feature } from "@/types/feature";
import Link from "next/link";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="wow fadeInUp group mb-12" data-wow-delay=".15s">
        <div className="mx-auto relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
          <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
          {icon}
        </div>
        <h3 className="text-center mb-3 text-lg font-bold text-primary lg:text-center">
          {title}
        </h3>
        <p className="text-center mb-4 text-body-color lg:mb-8 lg:text-center">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
