'use client';
import { motion } from "framer-motion";
import { Building, Hammer, Leaf, Truck, Wrench, HardHat, Layers, ShieldCheck, Ruler, Construction, ConstructionIcon, Building2Icon } from "lucide-react";
import { AiOutlineAntDesign } from "react-icons/ai";
import { FaBuilding, FaSketch } from "react-icons/fa";

const services = [
  {
    icon: <AiOutlineAntDesign className="w-10 h-10 text-white" />,
    title: "Design & Planning",
    description: "Custom building design and project planning services tailored to your unique needs.",
  },
  {
    icon: <FaBuilding className="w-10 h-10 text-white" />, 
    title: "Construction Management",
    description: "On-site project management, quality control, and ensuring project timelines are met.",
  },
  {
    icon: <FaSketch className="w-10 h-10 text-white" />,
    title: "Structural Engineering",
    description: "Advanced structural analysis, design, and reinforcement for long-lasting infrastructure.",
  },
  {
    icon: <Truck className="w-10 h-10 text-white" />,
    title: "Infrastructure Development",
    description: "Development of roads, bridges, tunnels, and large-scale infrastructure projects.",
  },
  {
    icon: <Leaf className="w-10 h-10 text-white" />,
    title: "Sustainable Construction",
    description: "Incorporating green building practices and energy-efficient solutions in every project.",
  },
  {
    icon: <Layers className="w-10 h-10 text-white" />,
    title: "Retrofitting & Renovation",
    description: "Upgrading and renovating existing buildings with modern, sustainable methods.",
  },
];

const Service = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-4xl font-semibold text-white">
            Our Services
          </h2>
          <p className="text-base text-white max-w-lg mx-auto mt-3">
            At Eva Engineering, we offer comprehensive construction and engineering services tailored to your project needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 items-center p-6 rounded-lg transition-all duration-300 hover:bg-white/10"
            >
              <div className="text-center text-5xl text-[#FFD700]">{service.icon}</div>
              <h3 className="text-xl font-medium">{service.title}</h3>
              <p className="text-white mt-1 text-sm">{service.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Service;
