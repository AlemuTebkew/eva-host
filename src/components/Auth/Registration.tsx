"use client";

import { useState } from "react";
import { ArrowLeft, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { registerUser } from "@/lib/api";

// Zod Schema for validation
const registrationSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .nonempty("Full name cannot be empty"),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    confirmPassword: z
      .string()
      .min(6, "Password confirmation is required")
      .nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Type inference from Zod schema
type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // React Hook Form setup
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });
  const onSubmit = async (data: RegistrationFormData) => {
    try {
      console.log(data);
      // Call the API to register the user
      const response = await registerUser(data);
      console.log("Registration successful:", response);
      // Redirect or show success message
      window.location.href = "/products";
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-white py-4">
      {/* Back Button */}
      <Button
        variant="link"
        className="absolute left-4 top-4 text-gray-800 hover:text-gray-600 focus:outline-none"
        onClick={() => window.history.back()}
      >
        <ArrowLeft size={40} />
        </Button>

      {/* Registration Card */}
      <main className="flex flex-1 items-center justify-center px-4 mt-5">
        <div className="w-full max-w-md rounded-2xl border px-8 py-10">
          <h2 className="mb-6 text-center text-xl font-semibold">Register</h2>

          {/* ShadCN Form Wrapper */}
          <Form {...form}>
            {/* Full Name Field */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col items-start">
                    <FormLabel className="text-left font-normal">
                      Full Name *
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    {/* Eye Icon - Centered */}
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

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative flex w-full flex-col items-start">
                    <FormLabel className="text-left font-normal">
                      Confirm Password *
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {/* Eye Icon - Centered */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </Button>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full cursor-not-allowed bg-blue-800 text-white"
              >
                Register
              </Button>
            </form>
          </Form>

          {/* Sign-In Link */}
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-orange-500 hover:underline"
            >
              Sign In
            </a>
          </div>
        </div>
      </main>

      {/* Optional SVG Background Pattern */}
      {/* Add your curved SVG here if needed */}
    </div>
  );
}
