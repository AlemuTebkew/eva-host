"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Step1 } from "./StepOneForm";
import StepTwo from "./StepTwoPlans";
import { getSubscriptionPlans } from "@/lib/api";
import Image from "next/image";
import { Button } from "../ui/button";

export default function SupplierRegistrationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [plans, setPlans] = useState([]);

  const methods = useForm({
    defaultValues: formData,
  });

  const nextStep = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    // Fetch subscription plans from API
    const fetchPlans = async () => {
      try {
        const { data } = await getSubscriptionPlans(); // Replace with your API endpoint
        console.log("Fetched subscription plans:", data);
        setPlans(data);
      } catch (error) {
        console.error("Failed to fetch subscription plans:", error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="my-10 flex bg-gray-100  justify-stretch rounded-lg ">
      {/* Left Ad */}
      <div className="hidden w-1/6 md:block">
        <Image
          src="/images/left-ads.png"
          alt="Left Ad"
          className="h-full object-cover"
          width={150}
          height={500}
        />
      </div>

      {/* Center Form */}
      <div className="mx-auto flex w-[80%] flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md">
        <div className="space-y-4 text-center">
          <h1 className="text-xl font-bold text-orange-600">
            Join EVA as a Supplier
          </h1>
          {step === 1 && (
            <div>
              <div className="flex items-center justify-center space-x-4">
                {/* Step 1 */}
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <span className="font-medium text-blue-600">Step 1</span>
                </div>
                {/* Connector */}
                <div className="h-0.5 w-12 bg-gray-300"></div>
                {/* Step 2 */}
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100">
                    <span className="font-bold text-gray-400">2</span>
                  </div>
                  <span className="font-medium text-gray-400">Step 2</span>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Tell Us About Your Business
                </h2>
                <p className="text-sm text-gray-500">
                  Join EVA as a supplier and reach more customers. <br />
                  Fill in your business details to get started!
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center space-x-4">
                  {/* Step 1 */}
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-blue-600">
                      <span className="font-bold text-white">✓</span>
                    </div>
                    <span className="font-medium text-blue-600">Step 1</span>
                  </div>
                  {/* Connector */}
                  <div className="h-0.5 w-12 bg-gray-300"></div>
                  {/* Step 2 */}
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100">
                      <span className="font-bold text-gray-400">2</span>
                    </div>
                    <span className="font-medium text-gray-400">Step 2</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Choose a Supplier Package
                  </h2>
                  <p className="text-sm text-gray-500">
                    Different supplier packages offer varying features and{" "}
                    <br />
                    benefits. Choose the one that fits your business needs.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <FormProvider {...methods}>
          {step === 1 && (
            <form
              className="w-full max-w-5xl"
              onSubmit={methods.handleSubmit(nextStep)}
            >
              <Step1 />
              <div className="mt-6 flex justify-end">
                <Button
                  type="submit"
                  className="btn btn-primary flex items-center space-x-2 bg-blue-800"
                >
                  <span>Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
            </form>
          )}
        </FormProvider>

        {step === 2 && (
          <StepTwo
            onBack={prevStep}
            formData={formData}
            subscriptionPlans={plans}
          />
        )}
      </div>

      {/* Right Ad */}
      <div className="hidden w-1/6  md:block">
    
        <Image
          src="/images/right-ads.png"
          alt="Right Ad"
          className="h-full object-cover"
          width={150}
          height={500}
        />
      </div>
    </div>
  );
}
