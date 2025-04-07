
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string | null;
  minOrderQuantity: string | null;
  vendor: {
    id: string;
    companyName: string;
    rating: number | null;
  };
  category: string;
  brand: string;
  attributes: Array<{
    name: string;
    value: string;
  }>;
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