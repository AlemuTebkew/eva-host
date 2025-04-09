'use client';

import { useState } from "react";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "../ui/phone-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Link from "next/link";

// Zod Schema for validation
const loginSchema = z.object({
  phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
  remember: z.boolean(),
});

// Type inference from Zod schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form setup
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-white py-4 flex items-center justify-center relative">
      {/* Back Button - Enhanced visibility */}
      <Button
        variant="link"
        className="absolute top-4 left-4 text-gray-800 hover:text-gray-600 focus:outline-none"
        onClick={() => window.history.back()}
      >
        <ChevronLeft size={40}/> {/* Increased icon size */}
      </Button>

      {/* Login Card */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md border rounded-2xl px-8 py-10">
          <h2 className="text-center text-xl font-semibold mb-6">
            Login
          </h2>

          {/* ShadCN Form Wrapper */}
          <Form {...form}>
            {/* Phone Number Field */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Adjusted size */}
                    </Button>
                  </FormItem>
                )}
              />

              {/* Remember Me Checkbox */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox name="remember" id="remember" />
                  <label htmlFor="remember" className="text-sm text-gray-700">
                    Remember Me
                  </label>
                </div>
                <a href="#" className="text-orange-500 hover:underline">
                  Forgot Password
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gray-200 text-white cursor-not-allowed"
              >
                Login
              </Button>
            </form>
          </Form>

          {/* Sign-Up Link */}
          <div className="mt-6 text-center text-sm">
            You’re new here?{" "}
            <Link href="/register" className="text-orange-500 font-medium hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </main>

      {/* Optional SVG Background Pattern */}
      {/* Add your curved SVG here if needed */}
    </div>
  );
}
