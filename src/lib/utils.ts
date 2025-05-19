import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// get url from env or here
export const getUrl = () => {

  return "http://16.171.71.23:5007/user"
  // if (process.env.API_URL) {
  //   // return process.env.API_URL
  //   // return "http://16.171.71.23:5007/user"
  //   return "http://127.0.0.1:5007/user"
  // } else {
  //   return "http://127.0.0.1:5007/user";
  // }
};

export const getBaseUrl = () => {
  return "http://16.171.71.23:5007";
};

export const getImageUrl = (image: string) => {
  if (!image) return '';
  return getBaseUrl() + "/files/" + image as any;
};
