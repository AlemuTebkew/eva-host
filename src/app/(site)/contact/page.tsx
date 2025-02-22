import { MapPin, Phone, Send } from "lucide-react";
import { FaMobileAlt, FaWhatsapp } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eva Engineering | Excellence in Engineering & Construction",
  description: "Eva Engineering is a leading construction and engineering company, providing innovative and sustainable solutions across industries.",
  keywords: "construction, engineering, sustainability, project management, Eva Engineering, infrastructure solutions",
  openGraph: {
    title: "Eva Engineering | Excellence in Engineering & Construction",
    description: "Discover innovative engineering and construction solutions with Eva Engineering. We deliver sustainable projects with precision and quality.",
    images: ["/images/logo/eva-engineering-logo.png"],
    url: "https://evaengineering.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eva Engineering | Excellence in Engineering & Construction",
    description: "Leading the way in engineering and construction solutions. Explore our services today.",
    images: ["/images/logo/eva-engineering-logo.png"],
  },
};

const ContactPage = () => {
  return (
    <section className="pb-12 px-6 max-w-6xl mx-auto pt-[120px] md:pt-[130px] lg:pt-[130px] pb-4 lg:pb-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Contact Eva Engineering</h2>
        <p className="text-lg text-gray-600 mt-3">We’re here to assist you. Reach out for inquiries about our engineering and construction services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaMobileAlt className="w-6 h-6 text-primary" />
              <a href="tel:+251900123456" className="text-primary text-lg font-medium hover:underline">
                +251 900 123 456
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-primary" />
              <a href="tel:+251 118 765 432" className="text-primary text-lg font-medium hover:underline">
                +251 118 765 432
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Send className="w-6 h-6 text-primary" />
              <a href="mailto:info@evaengineering.com" className="text-primary text-lg font-medium hover:underline">
                info@evaengineering.com
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <FaWhatsapp className="w-6 h-6 text-primary" />
              <a href="https://wa.me/+251900123456" target="_blank" className="text-primary text-lg font-medium hover:underline">
                WhatsApp
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-gray-700 text-lg font-medium">Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl">
          <iframe
            className="w-full h-72 md:h-80 rounded-2xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7705242191273!2d38.78641738029596!3d8.993251368032624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850070bdd3ed%3A0x41e19890a166badc!2sEva%20Engineering%20Headquarters!5e0!3m2!1sen!2set!4v1738784392660!5m2!1sen!2set"
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
