export interface QueryRequest {
  url?: string; // The URL to send the request to
  method?: string; // The HTTP method (GET, POST, etc.)
  data?: any; // The data to send with the request (for POST, PUT, etc.)
  params?: any; // Query parameters to include in the request
}