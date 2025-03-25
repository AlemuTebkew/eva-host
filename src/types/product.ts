export interface Price {
  city: string;
  price: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  material: string;
  rating: number;
  available: boolean;
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
