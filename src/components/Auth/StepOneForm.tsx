"use client";

import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import RegionSelector from "./AddressSelector";
import { FileUploader } from "./FileUploader";
import { MapPickerModal } from "./MapPickerModal";
import { Card } from "@/components/ui/card";

export const Step1 = () => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useFormContext();
  const [isMapOpen, setIsMapOpen] = useState(false);

  const latitude = watch("address.latitude");
  const longitude = watch("address.longitude");

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Personal Info */}
      <Card className="p-6 transition-all  duration-300  hover:translate-y-[-10px] hover:shadow-lg">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">
          Personal Information
        </h3>
        <div className="space-y-5">
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              First Name
            </FormLabel>
            <Input
              {...register("firstName", {
                required: "First name is required",
                maxLength: 255,
              })}
              placeholder="Enter first name"
              className="transition-all duration-200 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
            />
            <FormMessage className="text-sm">
              {errors.firstName?.message as string}
            </FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              Last Name
            </FormLabel>
            <Input
              {...register("lastName", {
                required: "Last name is required",
                maxLength: 255,
              })}
              placeholder="Enter last name"
              className="transition-all duration-200 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
            />
            <FormMessage className="text-sm">
              {errors.lastName?.message as string}
            </FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              Email
            </FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email address",
                },
                maxLength: 100,
              })}
              placeholder="Enter email"
              className="transition-all duration-200 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
            />
            <FormMessage className="text-sm">
              {errors.email?.message as string}
            </FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              Phone Number
            </FormLabel>
            <Controller
              control={control}
              name="phoneNumber"
              rules={{ required: "Phone number is required", maxLength: 100 }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  placeholder="Enter phone number"
                  className="transition-all duration-200 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                />
              )}
            />
            <FormMessage className="text-sm">
              {errors.phoneNumber?.message as string}
            </FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              Password
            </FormLabel>
            <Input
              type="password"
              {...register("password", { maxLength: 50 })}
              placeholder="Create a password"
              className="transition-all duration-200 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
            />
            <FormMessage className="text-sm">
              {errors.password?.message as string}
            </FormMessage>
          </FormItem>
        </div>
      </Card>

      {/* Company & Address */}
      <Card className="p-6 transition-all duration-300 hover:translate-y-[-10px]  hover:shadow-md">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">
          Company Information
        </h3>
        <div className="space-y-5">
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              Company Name
            </FormLabel>
            <Input
              {...register("companyName", {
                required: "Company name is required",
                maxLength: 255,
              })}
              placeholder="Enter company name"
              className="transition-all duration-200 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
            />
            <FormMessage className="text-sm">
              {errors.companyName?.message as string}
            </FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              Company TIN
            </FormLabel>
            <Input
              {...register("companyTIN", { maxLength: 50 })}
              placeholder="Enter TIN"
              className="transition-all duration-200 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
            />
            <FormMessage className="text-sm">
              {errors.companyTIN?.message as string}
            </FormMessage>
          </FormItem>

          <div className="grid gap-5 md:grid-cols-2">
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                License Photo (optional)
              </FormLabel>
              <FileUploader
                onFileAccepted={(file: string) =>
                  setValue("licensePhoto", file)
                }
              />
            </FormItem>

            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Company Logo (optional)
              </FormLabel>
              <FileUploader
                onFileAccepted={(file: string) => setValue("logo", file)}
              />
            </FormItem>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all duration-300 hover:bg-gray-50">
            <h4 className="mb-4 text-sm font-medium text-gray-900">
              Address Information
            </h4>
            <div className="space-y-5">
              <RegionSelector
                onChange={(value) => {
                  setValue("address.region", value.region);
                  setValue("address.city", value.city);
                  setValue("address.subCity", value.subCity);
                  setValue("address.woreda", value.woreda);
                }}
              />

              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Full Address
                </FormLabel>
                <Input
                  {...register("address.fullAddress", { maxLength: 255 })}
                  placeholder="Enter full address"
                  className="transition-all duration-200 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                />
                <FormMessage className="text-sm">
                  {errors["address.fullAddress"]?.message as string}
                </FormMessage>
              </FormItem>

              <div className="flex items-end gap-3 flex-wrap md:flex-nowrap">
                <div className="w-full">
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Latitude
                    </FormLabel>
                    <Input
                      {...register("address.latitude", { valueAsNumber: true })}
                      placeholder="Latitude"
                      type="number"
                      className="transition-all duration-200 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                    />
                  </FormItem>
                </div>
                <div className="w-full">
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Longitude
                    </FormLabel>
                    <Input
                      {...register("address.longitude", {
                        valueAsNumber: true,
                      })}
                      placeholder="Longitude"
                      type="number"
                      className="transition-all duration-200 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
                    />
                  </FormItem>
                </div>
                {/* <div className="w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsMapOpen(true)}
                    className="mb-[2px] h-10 transition-all duration-200 hover:bg-blue-50 hover:text-blue-800"
                  >
                    Pick from map
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <MapPickerModal
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onSelect={({ lat, lng }) => {
          setValue("address.latitude", lat.toString());
          setValue("address.longitude", lng.toString());
          setIsMapOpen(false);
        }}
      />
    </div>
  );
};
