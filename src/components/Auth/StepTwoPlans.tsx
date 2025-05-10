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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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

    console.log("Submitting payload:", payload);

    try {
      setIsSubmitting(true);
      const response = await registerSupplier(payload);
      console.log("Registration successful:", response);
      setShowSuccessDialog(true);
      toast.success(
        "Registration successful! We will contact you after approval.",
      );
      // Handle success (e.g., redirect to a success page)
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error("Registration failed! Please try again.");

      const errorMessage =
        error?.response?.message || "An unexpected error occurred.";
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
                <li>✔ {plan.numberOffProducts} products included</li>
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

      {showSuccessDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Registration Successful!</h2>
            <p className="mb-6 text-gray-700">
              We will contact you after approval.
            </p>
            <Button
              className="bg-blue-800 text-white"
              onClick={() => setShowSuccessDialog(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
