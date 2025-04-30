'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "../ui/phone-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Select from 'react-select';
import { Textarea } from "../ui/textarea";

// Zod Schema for validation
const supplierRegistrationSchema = z.object({
  businessName: z.string().min(1, "Business Name is required"),
  businessType: z.string().min(1, "Business Type is required"),
  establishmentDate: z.string().min(1, "Establishment Date is required"),
  contactPerson: z.string().min(1, "Contact Person's full name is required"),
  phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  email: z.string().email("Invalid email address"),
  mainProducts: z.string().min(1, "Main Products are required"),
  termsAndConditions: z.boolean().refine(val => val === true, { message: "You must agree to the Terms & Conditions" }),
});

// Type inference from Zod schema
type SupplierRegistrationFormData = z.infer<typeof supplierRegistrationSchema>;

export default function SupplierRegister() {
  // Correctly type selectedBusinessType as `string | null`
  const [selectedBusinessType, setSelectedBusinessType] = useState<string | null>(null);

  // React Hook Form setup
  const form = useForm<SupplierRegistrationFormData>({
    resolver: zodResolver(supplierRegistrationSchema),
    defaultValues: {
      businessType: ""
    }
  });

  const onSubmit = (data: SupplierRegistrationFormData) => {
    console.log(data);
  };

  // Options for the business type select dropdown
  const businessTypeOptions = [
    { value: 'retail', label: 'Retail' },
    { value: 'wholesale', label: 'Wholesale' },
    { value: 'manufacturer', label: 'Manufacturer' },
    { value: 'service', label: 'Service' },
    { value: 'distribution', label: 'Distribution' },
  ];

  return (
    <div className="min-h-screen bg-white py-4 flex items-center justify-center relative">
      {/* Back Button */}
      <Button
        variant="link"
        className="absolute top-4 left-4 text-gray-800 hover:text-gray-600 focus:outline-none"
        onClick={() => window.history.back()}
      >
        {/* Replace with your back icon */}
      </Button>

      {/* Registration Card */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md border rounded-2xl px-8 py-10">
          <h2 className="text-center text-xl font-semibold mb-6">
            Supplier Registration
          </h2>

          {/* ShadCN Form Wrapper */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              
              {/* Business Name Field */}
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start">
                    <FormLabel className="text-left">Business Name *</FormLabel>
                    <FormControl className="w-full">
                      <Input placeholder="Enter your business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Type Field (React Select) */}
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start">
                    <FormLabel className="text-left">Business Type *</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        options={businessTypeOptions}
                        value={businessTypeOptions.find(option => option.value === selectedBusinessType) || null}
                        onChange={(selectedOption) => {
                          const value = selectedOption ? selectedOption.value : null;
                          setSelectedBusinessType(value);
                          field.onChange(value); // Update react-hook-form value
                        }}
                        placeholder="Select business type"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Establishment Date Field */}
              <FormField
                control={form.control}
                name="establishmentDate"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start">
                    <FormLabel className="text-left">Establishment Date *</FormLabel>
                    <FormControl className="w-full">
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Person Full Name Field */}
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start">
                    <FormLabel className="text-left">Contact Person&apos;s Full Name *</FormLabel>
                    <FormControl className="w-full">
                      <Input placeholder="Enter contact person&apos;s full name" {...field} />
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
                    <FormLabel className="text-left">Phone Number *</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Address Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start">
                    <FormLabel className="text-left">Email Address *</FormLabel>
                    <FormControl className="w-full">
                      <Input placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Main Products Field */}
              <FormField
                control={form.control}
                name="mainProducts"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start">
                    <FormLabel className="text-left">Main Products *</FormLabel>
                    <FormControl className="w-full">
                      <Textarea placeholder="Enter your main products" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and Conditions Checkbox */}
              {/* <FormField
                control={form.control}
                name="termsAndConditions"
                render={({ field }) => (
                  <FormItem className="w-full flex items-center gap-2">
                    <Checkbox 
                      {...field} 
                      checked={field.value}  // Bind the checkbox state to field value
                      onChange={(e) => field.onChange(e.target.checked)} // Update field value on change
                    />
                    <FormLabel className="text-sm text-gray-700">
                      I agree to the <a href="/terms" className="text-orange-500 hover:underline">EVA Supplier Terms & Conditions</a>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}


              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gray-200 text-white cursor-not-allowed"
              >
                Register Supplier
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
