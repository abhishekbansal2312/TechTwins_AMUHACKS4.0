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
        "Supports PDFs, images, and various document types for flexible data intake.",
    },
    {
      icon: <Eye className="h-10 w-10 text-green-600" />,
      title: "OCR Extraction",
      description:
        "Extracts text from images and scanned documents with high accuracy using OCR.",
    },
    {
      icon: <Cpu className="h-10 w-10 text-green-600" />,
      title: "PII Detection",
      description:
        "Detects personal identifiable information using regex and machine learning models.",
    },
    {
      icon: <Shield className="h-10 w-10 text-green-600" />,
      title: "Automated Protection",
      description:
        "Automatically redacts sensitive data, sends notifications, and logs activity securely.",
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-green-600" />,
      title: "Security Dashboard",
      description:
        "Interactive dashboard for real-time monitoring, analytics, and incident reporting.",
    },
    {
      icon: <Database className="h-10 w-10 text-green-600" />,
      title: "Validation Intelligence",
      description:
        "Performs data pattern checks, validations, and contextual analysis for accuracy.",
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
            Powerful Data Protection
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Designed to ensure your documents and sensitive data remain secure
            and compliant.
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

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-green-800 mb-10 font-serif">
            Benefits of Strong Identity Protection
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-t-green-500">
              <h4 className="font-serif text-lg font-bold text-green-700 mb-3">
                Trust & Security
              </h4>
              <p className="text-gray-600">
                Strengthen trust with users and stakeholders by ensuring secure
                and compliant data handling.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-t-blue-500">
              <h4 className="font-serif text-lg font-bold text-green-700 mb-3">
                Responsible Innovation
              </h4>
              <p className="text-gray-600">
                Support ethical technology use with compliance-ready solutions
                and responsible data management.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-t-teal-500">
              <h4 className="font-serif text-lg font-bold text-green-700 mb-3">
                Operational Efficiency
              </h4>
              <p className="text-gray-600">
                Reduce costs from breaches, streamline workflows, and enhance
                productivity with smart automation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-green-800 mb-10 font-serif">
            Technologies Powering the Platform
          </h3>

          <div className="bg-white p-8 rounded-lg shadow-lg border border-green-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-green-50">
                <h4 className="font-medium text-green-700 mb-2">
                  Frontend Framework
                </h4>
                <p className="text-sm text-gray-600">React & Next.js</p>
              </div>

              <div className="text-center p-4 rounded-lg bg-green-50">
                <h4 className="font-medium text-green-700 mb-2">
                  Data Extraction
                </h4>
                <p className="text-sm text-gray-600">
                  Tesseract OCR & ML Models
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-green-50">
                <h4 className="font-medium text-green-700 mb-2">
                  Data Protection
                </h4>
                <p className="text-sm text-gray-600">
                  Encryption Libraries & Regex
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-green-50">
                <h4 className="font-medium text-green-700 mb-2">
                  Data Visualization
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
