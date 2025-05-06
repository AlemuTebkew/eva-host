"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EyeIcon, PencilIcon } from "lucide-react";

import { getUserProfile, } from "@/lib/api";
import { UserProfile } from "@/types/api";
import { getUrl } from "@/lib/utils";

export default function UserProfilePage() {
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // check token exist 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    setToken(token);

  }, []);

  // ❷ Fetch on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${getUrl()}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) throw new Error("Failed to fetch profile");
  
        const { data } = await res.json();
        setProfile(data);
      } catch (err: any) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        console.error("Failed to load profile", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
  
    loadProfile();
  }, []);

  // ❸ Loading / Error states
  if (loading) {
    return <div className="p-6 text-center">Loading profile…</div>;
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
    <div className="flex min-h-screen flex-col gap-6 bg-gray-50 p-6 lg:flex-row">
      {/* Sidebar */}
      <Card className="flex w-full flex-col items-center p-6 text-center lg:w-72">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="mb-4 h-20 w-20 rounded-full object-cover"
        />
        <h2 className="text-lg font-semibold">Pristia Candra</h2>
        <p className="text-sm text-gray-500">User</p>
        <div className="mt-4 w-full space-y-2 text-left text-sm">
          <p className="flex items-center gap-2 text-gray-700">
            <svg width="16" height="16" fill="currentColor">
              <path d="M2 2h12v12H2z" />
            </svg>
            {profile.email}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <svg width="16" height="16" fill="currentColor">
              <path d="M2 2h12v12H2z" />
            </svg>
            {profile.phoneNumber}
          </p>
        </div>
        <div className="mt-6 w-full border-t pt-4">
          <button className="w-full text-left text-sm text-blue-600 hover:underline">
            Saved Product
          </button>
        </div>
      </Card>

      {/* Main Content */}
      <Card className="w-full flex-1 p-6">
        <Tabs defaultValue="profile">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="profile">User Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* User Profile */}
          <TabsContent value="profile">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Personal Info</h3>
              <div
                onClick={() => setEditPersonalInfo(!editPersonalInfo)}
                className="flex items-center gap-1 text-blue-800 hover:underline"
              >
                <PencilIcon size={16} />
              </div>
            </div>
            <form className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={profile.fullName}
                  disabled={!editPersonalInfo}
                  required
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full rounded border p-2"
                  defaultValue={profile.gender}
                  disabled={!editPersonalInfo}
                  required
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  defaultValue={profile.dob?.split("T")[0]}
                  disabled={!editPersonalInfo}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={profile.email}
                  disabled={!editPersonalInfo}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={profile.phoneNumber}
                  disabled={!editPersonalInfo}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality *</Label>
                <select
                  id="nationality"
                  name="nationality"
                  className="w-full rounded border p-2"
                  defaultValue={profile.nationality}
                  disabled={!editPersonalInfo}
                  required
                >
                  <option value="Ethiopia">Ethiopia</option>
                </select>
              </div>

              <div className="col-span-full mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Address</h3>
                  <div
                    onClick={() => setEditAddress(!editAddress)}
                    className="flex cursor-pointer items-center gap-1 text-blue-800 hover:underline"
                  >
                    <PencilIcon size={16} />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    {editAddress ? (
                      <Input
                        id="country"
                        name="country"
                        defaultValue={profile.country}
                      />
                    ) : (
                      <p className="rounded bg-gray-100 p-2">
                        {profile.country}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="region">Region</Label>
                    {editAddress ? (
                      <Input
                        id="region"
                        name="region"
                        defaultValue={profile.region}
                      />
                    ) : (
                      <p className="rounded bg-gray-100 p-2">
                        {profile.region}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    {editAddress ? (
                      <Input
                        id="city"
                        name="city"
                        defaultValue={profile.city}
                      />
                    ) : (
                      <p className="rounded bg-gray-100 p-2">
                        {profile.city}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-full mt-4 text-right">
                <Button type="submit" className="bg-blue-800">
                  Save Profile
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <h3 className="mb-4 text-lg font-semibold">Change Password</h3>
            <form className="max-w-md space-y-4">
              {["old", "new", "confirm"].map((field) => (
                <div key={field}>
                  <Label htmlFor={`${field}Password`}>
                    {field === "old"
                      ? "Old Password *"
                      : field === "new"
                        ? "New Password *"
                        : "Confirm Password *"}
                  </Label>
                  <div className="relative">
                    <Input
                      id={`${field}Password`}
                      name={`${field}Password`}
                      type={showPassword[field as keyof typeof showPassword] ? "text" : "password"}
                      className="pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          [field as keyof typeof showPassword]: !prev[field as keyof typeof showPassword],
                        }))
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <EyeIcon size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <Button type="submit" className="bg-blue-800 mt-2">
                Save Password
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
