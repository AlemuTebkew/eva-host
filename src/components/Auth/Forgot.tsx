"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "../ui/phone-input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { StatusDialog } from "@/components/ui/status-dialog";
import Link from "next/link";
import { getUrl } from "@/lib/utils";

// --- API call for requesting password reset ---

async function requestPasswordReset({ phone }: { phone: string }) {
  try {
    const res = await fetch(`${getUrl()}/auth/forgot_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: phone }),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return { status: false, message: error?.message || "Network error" };
  }
}
async function resetPassword({
  phone,
  token,
  newPassword,
}: {
  phone: string;
  token: string;
  newPassword: string;
}) {
  try {
    const res = await fetch(`${getUrl()}/auth/reset_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: phone,
        resetCode: Number(token),
        newPassword,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return { status: false, message: error?.message || "Network error" };
  }
}
// -----------------------------------------------------

const phoneSchema = z.object({
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});
const resetSchema = z.object({
  token: z.string().min(4, "Token required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export default function ForgotPassword() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  // Step 1: Request reset
  const phoneForm = useForm<{ phone: string }>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  // Step 2: Enter token and new password
  const resetForm = useForm<{ token: string; newPassword: string }>({
    resolver: zodResolver(resetSchema),
    defaultValues: { token: "", newPassword: "" },
  });

  // Handle phone submit
  const handlePhoneSubmit = async (data: { phone: string }) => {
    setIsLoading(true);
    try {
      const res = await requestPasswordReset({ phone: data.phone });
      if (res.status) {

        console.log("res",res)
        setPhone(data.phone);
        setStep(2);
        setDialog({
          isOpen: true,
          type: "success",
          title: "Token Sent",
          message: res.message + ' ' + res?.data.code,
        });
      } else {
        throw new Error(res.message || "Failed to send token.");
      }
    } catch (err: any) {
      setDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: err.message || "Failed to send token.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset submit
  const handleResetSubmit = async (data: {
    token: string;
    newPassword: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await resetPassword({
        phone,
        token: data.token,
        newPassword: data.newPassword,
      });
      if (res.status) {
        setDialog({
          isOpen: true,
          type: "success",
          title: "Password Reset",
          message: "Your password has been reset. You can now log in.",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        throw new Error(res.message || "Failed to reset password.");
      }
    } catch (err: any) {
      setDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: err.message || "Failed to reset password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-4">
        <Button
          variant="ghost"
          className="absolute left-4 top-4 text-gray-800 transition-colors duration-200 hover:text-gray-600 focus:outline-none"
          onClick={() => window.history.back()}
          size="icon"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <main className="w-full max-w-md px-4">
          <div className="relative overflow-hidden rounded-2xl border border-blue-800/20 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-orange-500 to-blue-800 opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-800 to-orange-500 opacity-10"></div>
            <div className="relative mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Forgot Password
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {step === 1
                  ? "Enter your phone number to receive a reset token."
                  : "Enter the token sent to your phone and set a new password."}
              </p>
            </div>
            {step === 1 ? (
              <form
                onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
                className="space-y-6"
              >
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Controller
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter your phone number"
                        className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                      />
                    )}
                  />
                  {phoneForm.formState.errors.phone && (
                    <p className="mt-1 text-xs text-red-600">
                      {phoneForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-700 text-white shadow-lg transition-all duration-200 hover:from-blue-900 hover:to-blue-800 hover:shadow-xl disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : null}
                  {isLoading ? "Sending..." : "Send Token"}
                </Button>
              </form>
            ) : (
              <form
                onSubmit={resetForm.handleSubmit(handleResetSubmit)}
                className="space-y-6"
              >
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Token
                  </label>
                  <Input
                    placeholder="Enter the token"
                    {...resetForm.register("token")}
                    type="number"
                    className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                  />
                  {resetForm.formState.errors.token && (
                    <p className="mt-1 text-xs text-red-600">
                      {resetForm.formState.errors.token.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      {...resetForm.register("newPassword")}
                      className="w-full rounded-lg border-gray-300 pr-10 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  {resetForm.formState.errors.newPassword && (
                    <p className="mt-1 text-xs text-red-600">
                      {resetForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-700 text-white shadow-lg transition-all duration-200 hover:from-blue-900 hover:to-blue-800 hover:shadow-xl disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : null}
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}
            <div className="mt-8 flex justify-center space-x-4 text-center">
              <Link
                href="/login"
                className="font-medium text-orange-500 transition-colors duration-200 hover:text-orange-600"
              >
                Back to Login
              </Link>
              <Link
                href="/contact-us"
                className="text-blue8500 font-medium transition-colors duration-200"
              >
                Help Center
              </Link>
            </div>
          </div>
        </main>
        <StatusDialog
          isOpen={dialog.isOpen}
          onClose={() => setDialog((d) => ({ ...d, isOpen: false }))}
          title={dialog.title}
          message={dialog.message}
          type={dialog.type}
        />
      </div>
    </div>
  );
}
