"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Step1 } from "./StepOneForm";
import StepTwo from "./StepTwoPlans";
import { getSubscriptionPlans, SubscriptionPlan } from "@/lib/api";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function SupplierRegistrationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const { data } = await getSubscriptionPlans();
        setPlans(data);
      } catch (error) {
        console.error("Failed to fetch subscription plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const StepIndicator = ({ currentStep }: { currentStep: number }) => (
    <div className="flex items-center justify-center space-x-4">
      {/* Step 1 */}
      <div className="flex items-center space-x-2">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
            currentStep === 1
              ? "border-blue-600 bg-white"
              : "border-blue-600 bg-blue-600"
          }`}
        >
          <span
            className={`font-bold ${currentStep === 1 ? "text-blue-600" : "text-white"}`}
          >
            {currentStep === 1 ? "1" : "✓"}
          </span>
        </div>
        <span
          className={`font-medium transition-colors duration-300 ${
            currentStep === 1 ? "text-blue-600" : "text-blue-600"
          }`}
        >
          Step 1
        </span>
      </div>
      {/* Connector */}
      <div className="h-0.5 w-16 bg-gray-300"></div>
      {/* Step 2 */}
      <div className="flex items-center space-x-2">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
            currentStep === 1
              ? "border-gray-300 bg-gray-100"
              : "border-blue-600 bg-blue-100"
          }`}
        >
          <span
            className={`font-bold ${
              currentStep === 1 ? "text-gray-400" : "text-blue-600"
            }`}
          >
            2
          </span>
        </div>
        <span
          className={`font-medium transition-colors duration-300 ${
            currentStep === 1 ? "text-gray-400" : "text-blue-600"
          }`}
        >
          Step 2
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-white p-8 shadow-lg"
        >
          <div className="space-y-6">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold text-gray-900"
              >
                Join EVA as a Supplier
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-2 text-sm text-gray-600"
              >
                Complete the registration process to start your journey with EVA
              </motion.p>
            </div>

            <StepIndicator currentStep={step} />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormProvider {...methods}>
                  {step === 1 ? (
                    <form
                      className="mt-8 space-y-6"
                      onSubmit={methods.handleSubmit(nextStep)}
                    >
                      <Step1 />
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="group relative flex items-center space-x-2 bg-blue-800 px-6 py-3 text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                        >
                          <span>Next Step</span>
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                            initial={{ x: 0 }}
                            animate={{ x: 0 }}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="mt-8">
                      {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                        </div>
                      ) : (
                        <StepTwo
                          onBack={prevStep}
                          formData={formData}
                          subscriptionPlans={plans}
                        />
                      )}
                    </div>
                  )}
                </FormProvider>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
