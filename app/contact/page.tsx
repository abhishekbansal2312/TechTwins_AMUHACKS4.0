"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import SocialLinksRow from "@/components/contact/social-links";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formFocus, setFormFocus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: string) => {
    setFormFocus(field);
  };

  const handleBlur = () => {
    setFormFocus(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all the fields.");
      return;
    }

    // Show loading state
    toast.loading("Sending your message...");

    // Simulate API call delay
    setTimeout(() => {
      toast.dismiss();
      toast.success("Your message has been sent successfully!");
      setFormSubmitted(true);

      // Reset form after submission
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setFormSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="py-12 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center">
      <div className="w-full">
        <motion.div
          className="text-center pb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-purple-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We'd love to hear from you. Reach out for any questions or
            inquiries.
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background decoration */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-purple-100 to-purple-200 rounded-full opacity-30 blur-xl"></div>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full p-8 text-center"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="success"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </motion.svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thanks for reaching out. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key="form"
                  className="relative z-10"
                >
                  <div className="space-y-6">
                    <motion.div
                      className="flex flex-col"
                      variants={itemVariants}
                    >
                      <label
                        htmlFor="name"
                        className="text-lg font-semibold text-gray-700"
                      >
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus("name")}
                          onBlur={handleBlur}
                          required
                          className="border-2 border-gray-300 rounded-lg p-3 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                        />
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-purple-500"
                          initial={{ width: "0%" }}
                          animate={{
                            width: formFocus === "name" ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex flex-col"
                      variants={itemVariants}
                    >
                      <label
                        htmlFor="email"
                        className="text-lg font-semibold text-gray-700"
                      >
                        Your Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus("email")}
                          onBlur={handleBlur}
                          required
                          className="border-2 border-gray-300 rounded-lg p-3 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                        />
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-purple-500"
                          initial={{ width: "0%" }}
                          animate={{
                            width: formFocus === "email" ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex flex-col"
                      variants={itemVariants}
                    >
                      <label
                        htmlFor="message"
                        className="text-lg font-semibold text-gray-700"
                      >
                        Your Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus("message")}
                          onBlur={handleBlur}
                          required
                          rows={4}
                          className="border-2 border-gray-300 rounded-lg p-3 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                        />
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-purple-500"
                          initial={{ width: "0%" }}
                          animate={{
                            width: formFocus === "message" ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    <motion.button
                      type="submit"
                      className="w-full py-4 px-6 mt-6 rounded-lg bg-gradient-to-r from-emerald-500 to-purple-600 text-white font-semibold text-lg transition duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-lg hover:shadow-emerald-500/20 relative overflow-hidden group"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Send Message</span>
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-xl lg:block hidden overflow-hidden relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated decorative elements */}
            <motion.div
              className="absolute top-6 right-6 w-20 h-20 bg-emerald-500 rounded-full opacity-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-12 left-12 w-16 h-16 bg-purple-400 rounded-full opacity-70"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />
            <div className="relative pt-6 pb-6">
              <motion.h3
                className="text-2xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Contact Information
              </motion.h3>

              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="flex items-center"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4"></div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="text-lg font-semibold text-gray-800">
                      +91 9897652706
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4"></div>
                  <div></div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="text-lg font-semibold text-gray-800">
                      abhishekbansal2312@gmail.com
                    </p>
                  </div>
                </motion.div>
                <SocialLinksRow />
              </motion.div>
            </div>{" "}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
