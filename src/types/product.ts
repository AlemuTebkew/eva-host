export interface Price {
  city: string;
  price: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  prices: Price[];
}

export interface ProductResponse {
  page: number;
  limit: number;
  total: number;
  data: Product[];
}

export interface ProductQueryRequest {
  search?: string; // Optional search query
  limit?: number;  // Number of items per page
  page?: number;   // Current page number
}
