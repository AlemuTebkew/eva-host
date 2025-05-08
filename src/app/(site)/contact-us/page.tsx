"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { saveContactMessage } from "@/lib/api";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { message, status } = await saveContactMessage(
        formData.name,
        formData.email,
        formData.phone,
        formData.subject,
        formData.message,
      );

      if (status) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Have questions? We&apos;d love to hear from you. Send us a message and
            we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="mt-1 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Our Location</h3>
                  <p className="text-gray-600">
                    123 Business Street, Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="mt-1 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone Number</h3>
                  <p className="text-gray-600">+251 911 123 456</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="mt-1 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Email Address</h3>
                  <p className="text-gray-600">contact@example.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-64 rounded-lg bg-gray-200">
              {/* Add your map component here */}
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+251 911 123 456"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  className="h-32"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              {submitStatus === "success" && (
                <p className="text-center text-green-600">
                  Message sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-center text-red-600">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
