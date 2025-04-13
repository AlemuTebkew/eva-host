import { MetaData } from "./product";

export type Supplier = {
  id: string;
  companyName: string;
  phoneNumber?: string;
  email: string;
  bio: string;
  companyTIN: string;
  licensePhoto: string;
  logo: string;
  status: string;
  rating: number;
  // logoUrl?: string;
  // description?: string;
  // contactEmail?: string;
  // website?: string;
  // isVerified?: boolean;
  // createdAt?: string;
  // updatedAt?: string;
  // totalProducts: string
};


export type SupplierFilterType = {
  category?: string;
  minRating?: string;
};

export interface SupplierFilterResponse {
  data: Supplier[];
  meta: MetaData;
}