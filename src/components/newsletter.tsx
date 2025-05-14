"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/lib/api";
import { useTranslations } from "next-intl";

export default function Newsletter() {
  const t = useTranslations("newsletter"); // Use the "newsletter" namespace for translations
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError(t("phoneNumberRequired")); // Use translated error message
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      const { status, message } = await subscribeToNewsletter(
        email,
        fullName,
        phoneNumber,
      );

      if (status) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
      console.log("Subscribed:", { status, message });
    } catch (error) {
      console.error("Error subscribing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-stretch overflow-hidden rounded-xl border bg-white shadow-md md:flex-row">
          {/* Left: Orange Background */}
          <div className="bg-gradient-to-br from-orange-600 to-orange-200 p-6 text-white md:w-1/2 md:p-10">
            <h2 className="mb-4 text-2xl font-bold leading-tight md:text-3xl">
              {t("title")}
            </h2>
            <p className="text-sm md:text-base">{t("description")}</p>
          </div>

          {/* Right: Form Section */}
          <div className="flex flex-col justify-center bg-white p-6 md:w-1/2 md:p-10">
            <form onSubmit={handleSubmit} className="mb-4 space-y-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("fullNameLabel")}
                </label>
                <Input
                  placeholder={t("fullNamePlaceholder")}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("emailLabel")}
                </label>
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("phoneNumberLabel")}
                </label>

                <Input
                  type="tel"
                  placeholder={t("phoneNumberPlaceholder")}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>
              <div className="flex items-start space-x-4">
                <Button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("subscribing") : t("subscribeButton")}
                </Button>
                <p className="text-xs text-gray-500">
                  {t("privacyPolicyText")}{" "}
                  <a href="#" className="font-medium text-blue-800 underline">
                    {t("privacyPolicyLink")}
                  </a>
                  .
                </p>
              </div>
            </form>
            {submitStatus === "success" && (
              <p className="mt-4 text-green-600">{t("successMessage")}</p>
            )}
            {submitStatus === "error" && (
              <p className="mt-4 text-red-600">{t("errorMessage")}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
