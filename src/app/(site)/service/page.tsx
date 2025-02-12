import { Building, Ruler, Hammer, Leaf, Truck, Wrench, HardHat, Layers, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eva Engineering | Innovative Construction & Engineering Solutions",
  description: "Eva Engineering provides expert construction and engineering solutions, including design, planning, structural engineering, and sustainable building practices.",
  keywords: "construction engineering, structural engineering, sustainable construction, project management, commercial building, residential construction, infrastructure, civil engineering",
  // Open Graph Meta Tags for Social Media Sharing
  openGraph: {
    title: "Eva Engineering | Innovative Construction & Engineering Solutions",
    description: "Delivering innovative and sustainable engineering solutions across industries. Partner with us for expert services in construction, design, and project management.",
    images: ["/images/logo/logo.png"],  // Update with the path to a suitable image
    url: "https://evaengineering.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eva Engineering | Innovative Construction & Engineering Solutions",
    description: "Expert construction and engineering solutions tailored to your project needs.",
    images: ["/images/logo/logo.png"],  // Update with the path to a suitable image
  },
};

const Services = () => {
  const services = [
    {
      icon: <Ruler className="w-10 h-10 text-primary" />,
      title: "Design & Planning",
      description: "Custom building design and project planning services tailored to your unique needs.",
    },
    {
      icon: <Hammer className="w-10 h-10 text-primary" />, 
      title: "Construction Management",
      description: "On-site project management, quality control, and ensuring project timelines are met.",
    },
    {
      icon: <Building className="w-10 h-10 text-primary" />,
      title: "Structural Engineering",
      description: "Advanced structural analysis, design, and reinforcement for long-lasting infrastructure.",
    },
    {
      icon: <Truck className="w-10 h-10 text-primary" />,
      title: "Infrastructure Development",
      description: "Development of roads, bridges, tunnels, and large-scale infrastructure projects.",
    },
    {
      icon: <Leaf className="w-10 h-10 text-primary" />,
      title: "Sustainable Construction",
      description: "Incorporating green building practices and energy-efficient solutions in every project.",
    },
    {
      icon: <Layers className="w-10 h-10 text-primary" />,
      title: "Retrofitting & Renovation",
      description: "Upgrading and renovating existing buildings with modern, sustainable methods.",
    },
    {
      icon: <HardHat className="w-10 h-10 text-primary" />,
      title: "Safety & Compliance",
      description: "Ensuring that all projects meet safety standards and regulations.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Quality Assurance",
      description: "Strict quality control measures to ensure excellence in workmanship and materials.",
    },
  ];

  return (
    <section className="bg-white pt-[120px] md:pt-[130px] lg:pt-[130px] pb-4 lg:pb-8">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
        <p className="text-lg text-gray-600 mt-2">At Eva Engineering, we deliver expert construction and engineering services, from design to project completion.</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">{service.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
