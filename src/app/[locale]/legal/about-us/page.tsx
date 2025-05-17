'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Building2, Target, Users, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const t = useTranslations('legal.aboutUs');

  const sections = [
    {
      title: t('sections.mission.title'),
      content: t('sections.mission.content'),
      icon: <Target className="h-8 w-8 text-blue-600" />
    },
    {
      title: t('sections.whatWeDo.title'),
      content: [
        t('sections.whatWeDo.content'),
        ...t.raw('sections.whatWeDo.list')
      ],
      icon: <Building2 className="h-8 w-8 text-blue-600" />
    },
    {
      title: t('sections.values.title'),
      content: t.raw('sections.values.list'),
      icon: <HeartHandshake className="h-8 w-8 text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90" />
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
            <p className="text-lg md:text-xl text-blue-100">
              {t('sections.mission.content')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="mb-6 p-3 bg-blue-50 rounded-lg inline-block">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{section.title}</h2>
              {Array.isArray(section.content) ? (
                <div className="space-y-4">
                  <p className="text-gray-600">{section.content[0]}</p>
                  <ul className="space-y-2">
                    {section.content.slice(1).map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-600">{section.content}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Team Member {index + 1}</h3>
                <p className="text-gray-600">Position</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 