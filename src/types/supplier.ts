import { Category } from "./category";
import { MetaData, Product } from "./product";

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
  categories?: Category[];
  region?: { id: string; name: string };
  city?: { id: string; name: string };
  subCity?: { id: string; name: string };
  products?: Partial<Product[]>;
};


export type SupplierFilterType = {
  category?: string;
  minRating?: string;
};

export interface SupplierFilterResponse {
  data: Supplier[];
  meta: MetaData;
}