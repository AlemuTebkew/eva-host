
export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  images: string[]
  minOrderQuantity: string | null;
  vendor: {
    id: string;
    name: string;
    rating: number | null;
  };
  priceRange: {
    min: number,
    max: number
  }
  rating?: number;
  condition?: string;
}

export interface PorductFilterResponse {
  data: Product[];
  meta: MetaData;
}

export interface MetaData {
    total: number,
    page: number,
    limit: number,
    totalPages: number
}

export interface FilterType {
  category?: string;
  subCategory?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface SortOption {
  label: string
  value: {
    sortBy: string
    sortOrder: string
  }
}

export interface SortValue {
  sortBy: string;
  sortOrder: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  minOrderQuantity: string | null;
  condition: string;
  images: string[];
  attributes: Attribute[];
  vendor: Vendor
  priceUpdatedAt: string;
  priceTiers: {
    minQty: number,
    price: number
  }[]
  otherVendors: {
    id: string,
    price?: string,
    priceRange?: {
      min: string,
      max: string
    },
    vendor: Vendor
  }[]
}

interface Vendor {
  id: string;
  name: string;
  rating: number | null;
  logo: string;
};


interface Attribute {
  name: string;
  value: string;
}