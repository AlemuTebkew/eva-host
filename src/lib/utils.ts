import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// get url from env or here
export const getUrl = () => {
  if (process.env.API_URL) {
    // return process.env.API_URL
    return "http://127.0.0.1:5007/user"
  } else {
    return "http://127.0.0.1:5007/user";
  }
};

export const getImageUrl = (image: string) => {
  if (!image) return '';
  return getUrl() + "/files/" + image as any;
};
