"use client";

import { useState } from "react";
import { Eye, EyeOff, ChevronLeft, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "../ui/phone-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
// Zod Schema for validation
const loginSchema = z.object({
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
  remember: z.boolean(),
});

// Type inference from Zod schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form setup with default values
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "", // Default value for phone
      password: "", // Default value for password
      remember: false, // Default value for remember checkbox
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);

    try {
      console.log(data);
      setIsLoading(true); // Set loading state
      setError(null); // Reset error state
      // Call the API to register the user
      const response = await loginUser(data);

      const responseData = response?.data;
      localStorage.setItem("token", responseData?.token);
      console.log("Login successful:", response);
      // Redirect or show success message
      window.location.href = "/products";
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
      // Handle error (e.g., show error message to the user)
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
 
  return (
    <div className="relative flex items-center justify-center bg-white py-4">
      {/* Back Button */}
      <Button
        variant="link"
        className="absolute left-0 -top-4 text-gray-800 hover:text-gray-600 focus:outline-none mb-5 p-10"
        onClick={() => window.history.back()}
        size={"lg"}
      >
        <ArrowLeft size={48} />
      </Button>

      {/* Login Card */}
      <main className="flex flex-1 items-center justify-center px-4 mt-5">
        <div className="w-full max-w-md rounded-2xl border px-8 py-10">
          <h2 className="mb-6 text-center text-xl font-semibold">Login</h2>

          {/* ShadCN Form Wrapper */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col items-start">
                    <FormLabel className="text-left font-normal">
                      Phone Number *
                    </FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="Enter a phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative flex w-full flex-col items-start">
                    <FormLabel className="text-left font-normal">
                      Password *
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Input your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </FormItem>
                )}
              />

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox {...form.register("remember")} id="remember" />
                  <label htmlFor="remember" className="text-sm text-gray-700">
                    Remember Me
                  </label>
                </div>
                <a href="#" className="text-orange-500 hover:underline">
                  Forgot Password
                </a>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-800 text-white" disabled={isLoading}>
                {isLoading ? <Loader className="animate-spin" /> : "Login"}
              </Button>
            </form>
          </Form>

          {/* Sign-Up Link */}
          <div className="mt-6 text-center text-sm">
            You're new here?{" "}
            <Link
              href="/register"
              className="font-medium text-orange-500 hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
