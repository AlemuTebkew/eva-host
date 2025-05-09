import { Category } from "@/types/category";
import { Supplier } from "@/types/supplier";
import { Product } from "@/types/product";
import { Testimonial } from "@/types/testimonial";
import { ApiResponse, UserProfile } from "@/types/api";

const API_URL =  "http://16.171.71.23:5007/user"
// const API_URL = "http://127.0.0.1:5007/user";
// const BASE_URL = "http://127.0.0.1:5007";
const BASE_URL = "http://16.171.71.23:5007";

/**
 * Generic fetch function with error handling
 * @param endpoint - The endpoint to fetch from
 * @returns The response from the endpoint
 */
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    let token;
    // if (typeof window !== 'undefined') {
    //   token = localStorage.getItem('token');
    // }
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        // ...(token && { "Authorization": `Bearer ${token}` }),
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
): Promise<string> {
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

export async function getCategory(id: string): Promise<ApiResponse<Category>> {
  return fetchApi<ApiResponse<Category>>(`/categories/${id}`);
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

export async function getSupplier(id: string): Promise<ApiResponse<Supplier>> {
  return fetchApi<ApiResponse<Supplier>>(`/vendors/${id}`);
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

export async function getProduct(id: string): Promise<ApiResponse<Product>> {
  return fetchApi<ApiResponse<Product>>(`/products/${id}`);
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

export interface SubscriptionPlan {
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
  numberOffProducts: number;
  numberOfUsers: number;
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
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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

// write a function to register user
export async function registerUser(
  data: any,
): Promise<ApiResponse<{ userId: string }>> {
  try {
    console.log("Registering user with data:", data);
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error registering user:`, error);
    throw error;
  }
}

// write a function to login user
export async function loginUser(data: {
  phone: string;
  password: string;
}): Promise<ApiResponse<{ token: string }>> {
  try {
    console.log("Logging in user with data:", data);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error logging in user:`, error);
    throw error;
  }
}

// a function to fetch user profile
export async function getUserProfile(): Promise<ApiResponse<UserProfile>> {
  return fetchApi("/auth/me");
}
// afunction to fetch regions from api
export async function getRegions(): Promise<ApiResponse<{ id: string; name: string }[]>> {
 return fetchApi('/regions')
}

// afunction to fetch cities from api
export async function getCities(regionId: string): Promise<ApiResponse<{ id: string; name: string }[]>> {
 return fetchApi(`/cities/${regionId}`)
}
// afunction to fetch sub cities from api
export async function getSubCities(cityId: string): Promise<ApiResponse<{ id: string; name: string }[]>> {
 return fetchApi(`/sub_cities/${cityId}`)
}
// afunction to fetch woredas from api
export async function getWoredas(subCityId: string): Promise<ApiResponse<{ id: string; name: string }[]>> {
 return fetchApi(`/woredas/${subCityId}`)
}

export async function subscribeToNewsletter(email: string, fullName: string, phone: string): Promise<{ message: string, status: boolean }> {
  try {
    const response = await fetch(`${API_URL}/newsletter_subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, fullName, phone }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error subscribing to newsletter:`, error);
    throw error;
  }
};

// save contact us message
export async function saveContactMessage(
  fullName: string,
  email: string,
  phone: string,
  subject: string,
  message: string
): Promise<{ message: string; status: boolean }> {
  try {
    const response = await fetch(`${API_URL}/contact_us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        subject,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error saving contact message:`, error);
    throw error;
  }
}

export async function getRecommendedProducts(productId: string): Promise<ApiResponse<Product[]>> {
  return fetchApi<ApiResponse<Product[]>>(`/products/${productId}/recommendations`);
}


