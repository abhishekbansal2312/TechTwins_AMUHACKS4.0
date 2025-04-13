"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText, Cpu, Shield, BarChart4, Database, Eye } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-green-600" />,
      title: "Multiple Format Support",
      description:
        "Like a multilingual wizard, our system can handle PDFs, images, and various document formats.",
    },
    {
      icon: <Eye className="h-10 w-10 text-green-600" />,
      title: "OCR Extraction",
      description:
        "Our magical eye transforms images and PDFs into searchable text with the precision of a Remembrall.",
    },
    {
      icon: <Cpu className="h-10 w-10 text-green-600" />,
      title: "PII Detection",
      description:
        "Using regex and machine learning spells to detect sensitive data like Aadhar card, PAN, credit card information.",
    },
    {
      icon: <Shield className="h-10 w-10 text-green-600" />,
      title: "Automated Protection",
      description:
        "Automatic redaction, notification, and logging - like having your own personal house-elf guard your information.",
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-green-600" />,
      title: "Security Dashboard",
      description:
        "A web-based interface for monitoring and reporting - your personal Marauder's Map for security threats.",
    },
    {
      icon: <Database className="h-10 w-10 text-green-600" />,
      title: "Validation Intelligence",
      description:
        "Identifies patterns, performs checksums, and analyzes context with the brilliance of a Ravenclaw scholar.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-base font-semibold text-green-600 tracking-wide uppercase">
            Key Features
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
            Magical Protection Features
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our Identity Protector comes equipped with powerful enchantments to
            keep your information safe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 bg-white rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-all"
            >
              <div className="absolute -top-5 left-5 p-3 bg-green-50 rounded-full border-2 border-green-100">
                {feature.icon}
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900 font-serif">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section - Based on PDF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-green-800 mb-10 font-serif">
            The Magical Benefits of Identity Protection
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-t-green-500">
              <h4 className="font-serif text-lg font-bold text-green-700 mb-3">
                Building Trust & Safety
              </h4>
              <p className="text-gray-600">
                Build trust with the public, secure online transactions, and
                contribute to a safer digital realm by protecting sensitive data
                like a trusted Auror.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-t-blue-500">
              <h4 className="font-serif text-lg font-bold text-green-700 mb-3">
                Innovation & Social Accountability
              </h4>
              <p className="text-gray-600">
                Foster responsible tech advancement through compliance with
                regulations and socially mobilized data management, worthy of
                the Order of Merlin.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-t-teal-500">
              <h4 className="font-serif text-lg font-bold text-green-700 mb-3">
                Economic & Operational Efficiency
              </h4>
              <p className="text-gray-600">
                Achieve cost savings associated with data breaches and
                non-compliance, simplify document processing, and increase
                productivity across your organization like a well-cast Patronus
                dispelling dementors.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Dependencies Section - Based on PDF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-green-800 mb-10 font-serif">
            Technologies Behind Our Magic
          </h3>

          <div className="bg-white p-8 rounded-lg shadow-lg border border-green-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-green-50">
                <h4 className="font-medium text-green-700 mb-2">
                  Core Spellwork
                </h4>
                <p className="text-sm text-gray-600">React & Next.js</p>
              </div>

              <div className="text-center p-4 rounded-lg bg-green-50">
                <h4 className="font-medium text-green-700 mb-2">
                  Detection Charms
                </h4>
                <p className="text-sm text-gray-600">
                  Tesseract OCR & ML Models
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-green-50">
                <h4 className="font-medium text-green-700 mb-2">
                  Protection Enchantments
                </h4>
                <p className="text-sm text-gray-600">
                  Encryption Libraries & Regex
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-green-50">
                <h4 className="font-medium text-green-700 mb-2">
                  Visualization Potions
                </h4>
                <p className="text-sm text-gray-600">D3.js & Chart.js</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
