import type {
  Category,
  Supplier,
  Product,
  Testimonial,
  ApiResponse,
} from "@/types";

// const API_URL =  "http://16.171.71.23:5007/user"
const API_URL = "http://127.0.0.1:5007/user";
const BASE_URL = "http://127.0.0.1:5007";

/**
 * Generic fetch function with error handling
 */
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

// a function to upload a file to the server
export async function uploadFile(
  file: File,
): Promise<ApiResponse<{ filePath: string }>> {
  const formData = new FormData();
  formData.append("files", file);

  try {
    const response = await fetch(`${BASE_URL}/files`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`File upload error: ${response.status}`);
    }

    const data = await response.json();
    console.log("File uploaded successfully:", data);
    return data && data[0] ? data[0].id : "";
  } catch (error) {
    console.error(`Error uploading file:`, error);
    throw error;
  }
}

/**
 * Category API functions
 */
export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return fetchApi<ApiResponse<Category[]>>("/categories");
}

export async function getCategory(id: string): Promise<Category> {
  return fetchApi<Category>(`/categories/${id}`);
}

/**
 * Supplier API functions
 */
export async function getSuppliers(
  limit = 10,
): Promise<ApiResponse<Supplier[]>> {
  return fetchApi<ApiResponse<Supplier[]>>(`/vendors?limit=${limit}`);
}
/**
 * Supplier API functions
 */
export async function getFeaturedSuppliers(
  limit = 10,
): Promise<ApiResponse<Supplier[]>> {
  return fetchApi<ApiResponse<Supplier[]>>(`/featured_vendors?limit=${limit}`);
}

export async function getSupplier(id: string): Promise<Supplier> {
  return fetchApi<Supplier>(`/vendors/${id}`);
}

/**
 * Product API functions
 */
export async function getProducts(
  limit = 5,
  category?: string,
): Promise<ApiResponse<Product[]>> {
  const categoryParam = category ? `&category=${category}` : "";
  return fetchApi<ApiResponse<Product[]>>(
    `/featured_products?limit=${limit}${categoryParam}`,
  );
}

export async function getPopularProducts(
  limit = 5,
): Promise<ApiResponse<Product[]>> {
  return fetchApi<ApiResponse<Product[]>>(`/products?limit=${limit}`);
}

export async function getProduct(id: string): Promise<Product> {
  return fetchApi<Product>(`/products/${id}`);
}

/**
 * Get products with filtering and pagination
 */
export async function getFilteredProducts(options: {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}): Promise<ApiResponse<Product[]>> {
  const { page = 1, limit = 10, category, minPrice, maxPrice, sort } = options;

  // Build query parameters
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (category) params.append("category", category);
  if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());
  if (sort) params.append("sort", sort);

  return fetchApi<ApiResponse<Product[]>>(`/products?${params.toString()}`);
}

/**
 * Get all product categories
 */
export async function getProductCategories(): Promise<ApiResponse<Category[]>> {
  return fetchApi<ApiResponse<Category[]>>("/categories");
}

/**
 * Testimonial API functions
 */
export async function getTestimonials(
  limit = 3,
): Promise<ApiResponse<Testimonial[]>> {
  return fetchApi<ApiResponse<Testimonial[]>>(`/testimonials?limit=${limit}`);
}

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  isFeatured: boolean;
  annualDiscountPercent: number;
  isTrial: boolean;
  trialDurationInDays: number;
  supportLevel: 0 | 1 | 2 | 3;
  canCancelAnytime: boolean;
}

// aad to fetch subscription plans
export async function getSubscriptionPlans(): Promise<
  ApiResponse<SubscriptionPlan[]>
> {
  return fetchApi<ApiResponse<SubscriptionPlan[]>>("/subscription_plans");
}
//api to register supplier it has images accept form data
export async function registerSupplier(
  data: any,
): Promise<ApiResponse<Supplier>> {
  try {
    console.log("Registering supplier with data:", data);
    const response = await fetch(`${API_URL}/vendor_registration`, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error registering supplier:`, error);
    throw error;
  }
}
