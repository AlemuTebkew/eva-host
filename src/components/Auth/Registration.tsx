"use client";

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
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
import { StatusDialog } from "@/components/ui/status-dialog";
import Link from "next/link";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "error",
    title: "",
    message: "",
  });

  // React Hook Form setup
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await registerUser(data);
      setDialogState({
        isOpen: true,
        type: "success",
        title: "Registration Successful!",
        message: "Redirecting to products page...",
      });
      setTimeout(() => {
        window.location.href = "/products";
      }, 1500);
    } catch (error: any) {
      console.error("Registration failed:", error);
      setDialogState({
        isOpen: true,
        type: "error",
        title: "Registration Failed",
        message: error.message || "An error occurred during registration. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 py-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="absolute left-4 top-4 text-gray-800 hover:text-gray-600 focus:outline-none transition-colors duration-200"
        onClick={() => window.history.back()}
        size="icon"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      {/* Registration Card */}
      <main className="w-full max-w-md px-4">
        <div className="relative overflow-hidden rounded-2xl border border-blue-800/20 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
          {/* Background decorations */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-orange-500 to-blue-800 opacity-10"></div>
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-800 to-orange-500 opacity-10"></div>
          
          {/* Header */}
          <div className="relative mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">Join us and start your journey</p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name Field */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter your phone number"
                        className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="w-full rounded-lg border-gray-300 pr-10 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="w-full rounded-lg border-gray-300 pr-10 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-800 to-blue-700 text-white shadow-lg transition-all duration-200 hover:from-blue-900 hover:to-blue-800 hover:shadow-xl disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : null}
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Status Dialog */}
      <StatusDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState((prev) => ({ ...prev, isOpen: false }))}
        type={dialogState.type}
        title={dialogState.title}
        message={dialogState.message}
      />
    </div>
  );
}
