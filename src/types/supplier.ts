export type Supplier = {
  id: string;
  companyName: string;
  industry: string;
  location: string;
  bio: string;
  companyTIN: string;
  licensePhoto: string;
  logo: string;
  status: string;
  rating: number;
  logoUrl?: string;
  description?: string;
  contactEmail?: string;
  phoneNumber?: string;
  website?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  totalProducts: string
};

export type SupplierFilterType = {
  category?: string;
  minRating?: string;
};