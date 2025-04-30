import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// get url from env or here
export const getUrl = () => {
  if (process.env.API_URL) {
    return process.env.API_URL
  } else {
    return "http://16.171.71.23:5007";
  }
};

export const getImageUrl = (image: string) => {
  if (!image) return '';
  return getUrl() + "/files/" + image as any;
};
