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

export const Step1 = () => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [isMapOpen, setIsMapOpen] = useState(false);

  const latitude = watch("address.latitude");
  const longitude = watch("address.longitude");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Personal Info */}
      <div className="space-y-4">
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <Input
            {...register("firstName", {
              required: "First name is required",
              maxLength: 255,
            })}
            placeholder="Enter first name"
          />
          <FormMessage>{errors.firstName?.message as string}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <Input
            {...register("lastName", {
              required: "Last name is required",
              maxLength: 255,
            })}
            placeholder="Enter last name"
          />
          <FormMessage>{errors.lastName?.message as string}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Email</FormLabel>
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
          />
          <FormMessage>{errors.email?.message as string}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{ required: "Phone number is required", maxLength: 100 }}
            render={({ field }) => (
              <PhoneInput {...field} placeholder="Enter phone number" />
            )}
          />
          <FormMessage>{errors.phoneNumber?.message as string}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", { maxLength: 50 })}
            placeholder="Create a password"
          />
          <FormMessage>{errors.password?.message as string}</FormMessage>
        </FormItem>
      </div>

      {/* Company & Address */}
      <div className="space-y-4">
        <FormItem>
          <FormLabel>Company Name</FormLabel>
          <Input
            {...register("companyName", {
              required: "Company name is required",
              maxLength: 255,
            })}
            placeholder="Enter company name"
          />
          <FormMessage>{errors.companyName?.message as string}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Company TIN</FormLabel>
          <Input
            {...register("companyTIN", { maxLength: 50 })}
            placeholder="Enter TIN"
          />
          <FormMessage>{errors.companyTIN?.message as string}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>License Photo (optional)</FormLabel>
          <FileUploader
            onFileAccepted={(file: string) => setValue("licensePhoto", file)}
          />
        </FormItem>

        <FormItem>
          <FormLabel>Company Logo (optional)</FormLabel>
          <FileUploader
            onFileAccepted={(file: string) => setValue("logo", file)}
          />
        </FormItem>

        <RegionSelector
          onChange={(value) => {
            setValue("address.region", value.region);
            setValue("address.city", value.city);
            setValue("address.subCity", value.subCity);
            setValue("address.woreda", value.woreda);
          }}
        />

        <FormItem>
          <FormLabel>Full Address</FormLabel>
          <Input
            {...register("address.fullAddress", { maxLength: 255 })}
            placeholder="Enter full address"
          />
          <FormMessage>
            {errors['address.fullAddress']?.message as string}
          </FormMessage>
        </FormItem>

        <div className="flex items-end gap-2">
          <div className="w-full">
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <Input
                {...register("address.latitude", { valueAsNumber: true })}
                placeholder="Latitude"
                type="number"
              />
            </FormItem>
          </div>
          <div className="w-full">
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <Input
                {...register("address.longitude", { valueAsNumber: true })}
                placeholder="Longitude"
                type="number"
              />
            </FormItem>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsMapOpen(true)}
            disabled
          >
            Pick from map
          </Button>
        </div>
      </div>

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
