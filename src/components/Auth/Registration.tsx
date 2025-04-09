'use client';

import { useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "../ui/phone-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

// Zod Schema for validation
const registrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required").nonempty("Full name cannot be empty"),
  phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
  confirmPassword: z.string().min(6, "Password confirmation is required").nonempty("Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
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

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-white py-4 flex items-center justify-center relative">
      {/* Back Button */}
      <Button
        variant="link"
        className="absolute top-4 left-4 text-gray-800 hover:text-gray-600 focus:outline-none"
        onClick={() => window.history.back()}
      >
        <ChevronLeft size={32} />
      </Button>

      {/* Registration Card */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md border rounded-2xl px-8 py-10">
          <h2 className="text-center text-xl font-semibold mb-6">
            Register
          </h2>

          {/* ShadCN Form Wrapper */}
          <Form {...form}>
            {/* Full Name Field */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start">
                    <FormLabel className="text-left font-normal">Full Name *</FormLabel>
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
                  <FormItem className="w-full flex flex-col items-start">
                    <FormLabel className="text-left font-normal">Phone Number *</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput placeholder="Enter a phone number" {...field} />
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
                  <FormItem className="w-full flex flex-col items-start relative">
                    <FormLabel className="text-left font-normal">Password *</FormLabel>
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
                      className="absolute top-1/2 right-3 transform -translate-y-1/2"
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
                  <FormItem className="w-full flex flex-col items-start relative">
                    <FormLabel className="text-left font-normal">Confirm Password *</FormLabel>
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </FormItem>
                )}
              />


              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gray-200 text-white cursor-not-allowed"
              >
                Register
              </Button>
            </form>
          </Form>

          {/* Sign-In Link */}
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <a href="#" className="text-orange-500 font-medium hover:underline">
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
