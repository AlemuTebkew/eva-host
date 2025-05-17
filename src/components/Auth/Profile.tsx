"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  EyeIcon,
  PencilIcon,
  LogOutIcon,
  UserCircle,
  Mail,
  Phone,
  Calendar,
  Globe,
  Shield,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { UserProfile } from "@/types/api";
import { getUrl } from "@/lib/utils";

export default function UserProfilePage() {
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Check token existence
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    setToken(token);
  }, []);

  // Fetch profile on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${getUrl()}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const { data } = await res.json();
        setProfile(data);
      } catch (err: any) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  // Update profile handler
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        fullName: formData.get("fullName"),
        gender: formData.get("gender"),
        dob: formData.get("dob"),
        email: formData.get("email"),
        phoneNumber: formData.get("phone"),
      };

      const res = await fetch(`${getUrl()}/auth/me/${profile?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const { data: updatedProfile } = await res.json();
      setProfile(updatedProfile);
      setEditPersonalInfo(false);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  // Update password handler
  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData(e.currentTarget);
      const oldPassword = formData.get("oldPassword");
      const newPassword = formData.get("newPassword");
      const confirmPassword = formData.get("confirmPassword");

      if (newPassword !== confirmPassword) {
        throw new Error("New passwords do not match");
      }

      const res = await fetch(`${getUrl()}/auth/me/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!res.ok) throw new Error("Failed to update password");

      toast.success("Password updated successfully");
      e.currentTarget.reset();
    } catch (err: any) {
      toast.error(err.message || "Failed to update password");
    } finally {
      setIsUpdating(false);
    }
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Loading / Error states
  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="mb-4 h-32 w-full" />
        <Skeleton className="mb-2 h-20 w-full" />
        <Skeleton className="mb-2 h-20 w-full" />
        <Skeleton className="mb-2 h-20 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading profile: {error}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
              <UserCircle className="h-full w-full text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.fullName}
              </h1>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOutIcon size={16} />
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <Card className="overflow-hidden">
          <Tabs defaultValue="profile" className="w-full">
            <div className="border-b bg-gray-50/50 px-6">
              <TabsList className="h-14 w-full justify-start gap-4 bg-transparent">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  <UserCircle size={18} />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  <Shield size={18} />
                  Security
                </TabsTrigger>
              </TabsList>
            </div>

            {/* User Profile */}
            <TabsContent value="profile" className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Personal Info
                </h3>
                <Button
                  onClick={() => setEditPersonalInfo(!editPersonalInfo)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <PencilIcon size={16} />
                  {editPersonalInfo ? "Cancel" : "Edit"}
                </Button>
              </div>
              <form
                onSubmit={handleUpdateProfile}
                className="grid gap-6 md:grid-cols-2"
              >
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    defaultValue={profile.fullName}
                    disabled={!editPersonalInfo}
                    required
                    className="transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={profile.gender}
                    disabled={!editPersonalInfo}
                    required
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    defaultValue={profile.dob?.split("T")[0]}
                    disabled={!editPersonalInfo}
                    required
                    className="transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={profile.email}
                    disabled={!editPersonalInfo}
                    required
                    className="transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={profile.phoneNumber}
                    disabled={!editPersonalInfo}
                    required
                    className="transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                {editPersonalInfo && (
                  <div className="col-span-full mt-4 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </form>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="p-6">
              <h3 className="mb-6 text-xl font-semibold text-gray-900">
                Change Password
              </h3>
              <form
                onSubmit={handleUpdatePassword}
                className="max-w-md space-y-4"
              >
                {[
                  { field: "old", label: "Old Password" },
                  { field: "new", label: "New Password" },
                  { field: "confirm", label: "Confirm Password" },
                ].map(({ field, label }) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={`${field}Password`}>{label} *</Label>
                    <div className="relative">
                      <Input
                        id={`${field}Password`}
                        name={`${field}Password`}
                        type={
                          showPassword[field as keyof typeof showPassword]
                            ? "text"
                            : "password"
                        }
                        className="pr-10 transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            [field as keyof typeof showPassword]:
                              !prev[field as keyof typeof showPassword],
                          }))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <EyeIcon size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                <Button
                  type="submit"
                  className="mt-6 bg-blue-600 hover:bg-blue-700"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </motion.div>
  );
}
