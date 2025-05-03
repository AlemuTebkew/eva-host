"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { register } from "module";
import { registerSupplier } from "@/lib/api";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  numberOffProduct: number;
  isFeatured: boolean;
  annualDiscountPercent: number;
  isTrial: boolean;
  trialDurationInDays: number;
  supportLevel: 0 | 1 | 2 | 3;
  canCancelAnytime: boolean;
}

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
    if (!selectedPlanId) {
      alert("Please select a plan");
      return;
    }

    const payload = {
      ...formData,
      subscriptionPlanId: selectedPlanId,
      billingCycle,
      paymentMethod,
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await registerSupplier(JSON.stringify(payload));
      console.log("Registration successful:", response);
      // Handle success (e.g., redirect to a success page)
    } catch (error: any) {
      console.error("Registration failed:", error);
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      alert(errorMessage); // Show a user-friendly error message
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer border-2 ${
              selectedPlanId === plan.id ? "border-blue-800" : "border-gray-200"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-bold">{plan.name}</span>
                {plan.isFeatured && (
                  <span className="rounded bg-yellow-300 px-2 py-1 text-xs text-black">
                    Featured
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                {plan.description || "No description available"}
              </p>
              <p className="text-2xl font-bold">
                {plan.isTrial
                  ? "Free"
                  : `ETB${Number(plan.price).toFixed(2)} ${
                      billingCycle === "annually" ? "/ year" : "/ month"
                    }`}
              </p>
              {plan.isTrial && (
                <p className="mt-1 text-xs text-green-600">
                  {plan.trialDurationInDays} days free trial
                </p>
              )}
              {plan.annualDiscountPercent > 0 &&
                billingCycle === "annually" && (
                  <p className="mt-1 text-xs text-blue-800">
                    Save {plan.annualDiscountPercent}% with annual billing
                  </p>
                )}

              <div className="mt-6 flex justify-center">
                <Button
                  className={`w-full ${
                    selectedPlanId === plan.id ? "bg-blue-800 text-white" : ""
                  }`}
                  onClick={() => setSelectedPlanId(plan.id)}
                >
                  {selectedPlanId === plan.id ? "Selected" : "Choose Plan"}
                </Button>
              </div>
              <p className="mt-4 text-xs text-blue-600">What is Included</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>✔ {plan.numberOffProduct} products included</li>
                <li>
                  ✔ Support Level:{" "}
                  {
                    ["None", "Basic", "Premium", "Enterprise"][
                      plan.supportLevel
                    ]
                  }
                </li>
                <li>
                  ✔{" "}
                  {plan.canCancelAnytime
                    ? "Cancel anytime"
                    : "No cancellations"}
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

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
        <Button className="bg-blue-800" onClick={handleSubmit} disabled={!selectedPlanId}>
          Complete <span className="ml-2">✔</span>
        </Button>
      </div>
    </div>
  );
}
