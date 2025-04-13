import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const JourneyBenefits: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const benefits = [
    {
      title: "Building Trust & Safety",
      description:
        "Create a secure digital environment that builds trust with users and ensures safety of personal data",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Innovation & Social Accountability",
      description:
        "Promote responsible technological advancement through compliance with regulations and social data management",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L3 7L12 12L21 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 17L12 22L21 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 12L12 17L21 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Economic & Operational Efficiency",
      description:
        "Reduce costs associated with data breaches and non-compliance while increasing productivity across your organization",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12C8 13.1046 7.10457 14 6 14Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 7.5L16.5 16.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 16.5L16.5 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-24 bg-green-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <motion.h2
            className="text-4xl font-bold mb-6 text-green-300"
            variants={fadeInUp}
          >
            Why Choose Identity Secure
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-green-500 mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-xl text-green-100 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            The ultimate solution for safeguarding your personal information in
            the digital age
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              custom={index * 0.2}
            >
              <motion.div
                className="bg-green-800/30 p-6 rounded-full mb-6 text-green-400 border-2 border-green-800/50"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
                  borderColor: "rgba(16, 185, 129, 0.5)",
                }}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-green-300">
                {benefit.title}
              </h3>
              <p className="text-green-100/80">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-24 bg-green-800/30 border border-green-700/50 p-8 rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-green-300">
                Ready to secure your digital identity?
              </h3>
              <p className="text-green-100/80 mb-6">
                Join thousands of individuals and businesses who trust Identity
                Protector to safeguard their sensitive information.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-green-100/80">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Advanced PII detection algorithms
                </li>
                <li className="flex items-center text-green-100/80">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Comprehensive document support
                </li>
                <li className="flex items-center text-green-100/80">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Enterprise-grade security
                </li>
              </ul>
            </div>
            <div className="flex justify-center md:justify-end">
              <motion.button
                className="px-8 py-4 bg-green-600 text-white text-lg font-semibold hover:bg-green-500 transition-all duration-300 shadow-lg rounded-md"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="text-white text-lg font-semibold"
                >
                  Contact Us
                </Link>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyBenefits;
