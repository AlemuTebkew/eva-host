'use client';
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SideAdsWrapper from "../Auth/SideAdsWrapper";

interface LegalPageProps {
  title: string;
  sections: {
    title: string;
    content: string | string[];
  }[];
}

export default function LegalPage({ title, sections }: LegalPageProps) {
  const t = useTranslations("legal");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <SideAdsWrapper>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="mb-8 text-center text-4xl font-bold text-gray-900"
          >
            {title}
          </motion.h1>
          
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={index}
                variants={itemVariants}
                className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <h2 className="mb-4 text-2xl font-semibold text-blue-900">
                  {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.1 }}
                        className="flex items-start space-x-2 text-gray-700"
                      >
                        <span className="mt-1.5 text-blue-500">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{section.content}</p>
                )}
              </motion.section>
            ))}
          </div>

          {/* Last Updated */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center text-sm text-gray-500"
          >
            Last updated: {new Date().toLocaleDateString()}
          </motion.div>
        </motion.div>
      </div>
    </div>
    </SideAdsWrapper>
  );
}
