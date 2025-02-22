import { MapPin, Phone, Send } from "lucide-react";
import { FaMobile, FaMobileAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
        <p className="text-lg text-gray-600 mt-4">
          Reach out to us for inquiries, partnerships, or support.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gray-100 p-6 rounded-xl text-center shadow-md">
          <MapPin className="text-primary mx-auto mb-3" size={40} />
          <h3 className="text-xl font-semibold text-gray-900">Location</h3>
          <p className="text-gray-600 mt-2">Addis Ababa, Ethiopia</p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl text-center shadow-md">
          <FaMobileAlt className="text-primary mx-auto mb-3" size={40} />
          <h3 className="text-xl font-semibold text-gray-900">Call Us</h3>
          <p className="text-gray-600 mt-2">
            <a href="tel:+251900123456" className="text-primary font-medium hover:underline">
            +251 900 123 456
            </a>
           
          </p>
        </div>

        
        <div className="bg-gray-100 p-6 rounded-xl text-center shadow-md">
          <Phone className="text-primary mx-auto mb-3" size={40} />
          <h3 className="text-xl font-semibold text-gray-900">Call Us</h3>
          <p className="text-gray-600 mt-2">
            <a href="tel:+251118765432" className="text-primary font-medium hover:underline">
            +251 118 765 432
            </a>
          </p>
        </div>
      </div>
  </section>

  );
};

export default Contact;
