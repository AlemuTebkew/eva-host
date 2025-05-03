"use client";

import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import RegionSelector from "./AddressSelector";
import { FileUploader } from "./FileUploader";
import { MapPickerModal } from "./MapPickerModal";

export const Step1 = () => {
  const { control, register, setValue, watch } = useFormContext();
  const [isMapOpen, setIsMapOpen] = useState(false);

  const latitude = watch("address.latitude");
  const longitude = watch("address.longitude");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Personal Info */}
      <div className="space-y-4">
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <Input {...register("firstName")} placeholder="Enter first name" />
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <Input {...register("lastName")} placeholder="Enter last name" />
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register("email")}
            placeholder="Enter email"
          />
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <PhoneInput {...field} placeholder="Enter phone number" />
            )}
          />
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password")}
            placeholder="Create a password"
          />
          <FormMessage />
        </FormItem>
      </div>

      {/* Company & Address */}
      <div className="space-y-4">
        <FormItem>
          <FormLabel>Company Name</FormLabel>
          <Input
            {...register("companyName")}
            placeholder="Enter company name"
          />
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Company TIN</FormLabel>
          <Input {...register("companyTIN")} placeholder="Enter TIN" />
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>License Photo (optional)</FormLabel>
          <FileUploader
            label="Upload License Photo"
            name="licensePhoto"
            onFileAccepted={(file) => setValue("licensePhoto", file)}
          />
        </FormItem>

        <FormItem>
          <FormLabel>Company Logo (optional)</FormLabel>
          <FileUploader
            name="logo"
            onFileAccepted={(file) => setValue("logo", file)}
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
            {...register("address.fullAddress")}
            placeholder="Enter full address"
          />
          <FormMessage />
        </FormItem>

        <div className="flex items-end gap-2">
          <div className="w-full">
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <Input {...register("address.latitude")} placeholder="Latitude" />
            </FormItem>
          </div>
          <div className="w-full">
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <Input
                {...register("address.longitude")}
                placeholder="Longitude"
              />
            </FormItem>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsMapOpen(true)}
          >
            Pick from map
          </Button>
        </div>
      </div>

      <MapPickerModal
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onSelect={(lat, lng) => {
          setValue("address.latitude", lat.toString());
          setValue("address.longitude", lng.toString());
          setIsMapOpen(false);
        }}
        defaultCoords={{
          lat: parseFloat(latitude || "0"),
          lng: parseFloat(longitude || "0"),
        }}
      />
    </div>
  );
};
