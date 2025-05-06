// src/types/api.ts
export interface ApiResponse<T> {
  data: T
}


// ❶ Profile state
export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  region: string;
  subCity: string;
  woreda: string;
  country: string;
  gender: string;
  dob: string;
  nationality: string;

}
