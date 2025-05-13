"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { register } from "module";
import { registerSupplier, SubscriptionPlan } from "@/lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { StatusDialog } from "@/components/ui/status-dialog";

interface StepTwoProps {
  onBack: () => void;
  formData: any;
  subscriptionPlans: SubscriptionPlan[];
}

export default function StepTwo({
  onBack,
  formData,
  subscriptionPlans,
}: StepTwoProps) {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly",
  );
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "bank">("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    // Adjust prices based on billing cycle
    setPlans(
      subscriptionPlans.map((plan) => ({
        ...plan,
        price:
          billingCycle === "monthly"
            ? plan.price
            : plan.price * 12 * (1 - plan.annualDiscountPercent / 100),
      })),
    );
  }, [billingCycle, subscriptionPlans]);

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      subscriptionPlanId: selectedPlanId,
      billingCycle,
      paymentMethod,
    };

    try {
      setIsSubmitting(true);
      const response = await registerSupplier(payload);
      setDialogState({
        isOpen: true,
        type: "success",
        title: "Registration Successful!",
        message: "We will contact you after approval.",
      });
      toast.success(
        "Registration successful! We will contact you after approval.",
      );
    } catch (error: any) {
      console.error("registration error", error);
      setDialogState({
        isOpen: true,
        type: "error",
        title: "Registration Failed",
        message: error.message || "An error occurred during registration",
      });
      toast.error(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-5 w-full max-w-6xl space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            className={`group cursor-pointer border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              selectedPlanId === plan.id
                ? "border-blue-800 bg-blue-50/50"
                : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <CardHeader className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/0 to-blue-50/0 transition-all duration-300 group-hover:from-blue-50/20 group-hover:via-blue-50/10 group-hover:to-blue-50/0" />
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-bold transition-colors duration-300 group-hover:text-blue-800">
                  {plan.name}
                </span>
                {plan.isFeatured && (
                  <span className="rounded bg-gradient-to-r from-yellow-400 to-yellow-300 px-3 py-1 text-xs font-medium text-black shadow-sm transition-all duration-300 group-hover:shadow-md">
                    Featured
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                {plan.description || "No description available"}
              </p>
              <p className="text-2xl font-bold transition-colors duration-300 group-hover:text-blue-800">
                {plan.isTrial
                  ? "Free"
                  : `ETB ${Number(plan.price).toFixed(2)} `}
                {!plan.isTrial && (
                  <span className="text-sm font-normal text-gray-600">
                    {billingCycle === "annually" ? "/ year" : "/ month"}
                  </span>
                )}
              </p>
              {plan.isTrial && (
                <p className="mt-1 text-xs text-green-600 transition-colors duration-300 group-hover:text-green-700">
                  {plan.trialDurationInDays} days free trial
                </p>
              )}
              {plan.annualDiscountPercent > 0 &&
                billingCycle === "annually" && (
                  <p className="mt-1 text-xs text-blue-800 transition-colors duration-300 group-hover:text-blue-900">
                    Save {plan.annualDiscountPercent}% with annual billing
                  </p>
                )}

              <div className="mt-6 flex justify-center">
                <Button
                  className={`w-full transition-all duration-100 ${
                    selectedPlanId === plan.id
                      ? "bg-gradient-to-r from-blue-800 to-blue-300 text-white shadow-md"
                      : "bg-white text-blue-800 hover:bg-blue-50 hover:shadow-sm"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking button
                    setSelectedPlanId(plan.id);
                  }}
                >
                  {selectedPlanId === plan.id ? "Selected" : "Choose Plan"}
                </Button>
              </div>
              <p className="mt-4 text-xs font-medium text-blue-600 transition-colors duration-300 group-hover:text-blue-800">
                What is Included
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {[
                  {
                    text: `${plan.numberOffProduct === -1 ? "Unlimited" : plan.numberOffProduct} products included`,
                  },
                  {
                    text: `${plan.numberOfUser === -1 ? "Unlimited" : plan.numberOfUser} users included`,
                  },
                  {
                    text: plan.isFeatured
                      ? "Products Visible as Featured in Homepage"
                      : "No Products Visible as Featured in Homepage",
                  },
                  {
                    text: plan.isFeatured
                      ? "Profile Visible as Featured in Homepage"
                      : "No Profile Visible as Featured in Homepage",
                  },
                  {
                    text: `${plan.searchPriority === 3 ? "Highest" : plan.searchPriority === 2 ? "High" : plan.searchPriority === 1 ? "Medium" : "Normal"} search priority`,
                  },
                  {
                    text: plan.canPromote
                      ? "Can promote products"
                      : "No promotions",
                  },
                  ...(plan.canPromote
                    ? [
                        { text: "Can Post Promotional Ads" },
                        {
                          text: `Up to ${plan.maxPromotions} promotions per month`,
                        },
                        {
                          text: `${plan.promotionDay} days promotion duration`,
                        },
                      ]
                    : []),
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 transition-colors duration-300 group-hover:text-gray-800"
                  >
                    <span className="text-green-600">✔</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <ToastContainer />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label className="mb-4 block">Billing Cycle</Label>
          <RadioGroup
            value={billingCycle}
            onValueChange={(val: "monthly" | "annually") =>
              setBillingCycle(val)
            }
          >
            <div className="mb-5 flex items-center space-x-4">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Monthly</Label>
            </div>
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="annually" id="annually" />
              <Label htmlFor="annually">Annually</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="mb-4 block">Payment Method</Label>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(val: "cash" | "bank") => setPaymentMethod(val)}
          >
            <div className="mb-5 flex items-center space-x-4">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash">Cash</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank">Bank Transfer</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3 ">
        <Button variant="outline" className="bg-white" onClick={onBack}>
          <span className="mr-2">←</span> Previous
        </Button>
        <Button
          className="bg-blue-800"
          onClick={handleSubmit}
          disabled={!selectedPlanId || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Complete"}{" "}
          <span className="ml-2">✔</span>
        </Button>
      </div>

      <StatusDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState((prev) => ({ ...prev, isOpen: false }))}
        type={dialogState.type}
        title={dialogState.title}
        message={dialogState.message}
        actionButton={
          dialogState.type === "success"
            ? {
                label: "Close",
                onClick: () =>
                  setDialogState((prev) => ({ ...prev, isOpen: false })),
              }
            : undefined
        }
      />
    </div>
  );
}
