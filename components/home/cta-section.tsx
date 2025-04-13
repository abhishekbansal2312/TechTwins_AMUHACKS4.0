"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12 dark:bg-gray-900">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Ready to Safeguard Your Sensitive Information?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
              Transform vulnerable documents into protected content with our
              Identity Protector application.
            </p>
          </motion.div>

          {/* Workflow Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
            className="my-12 grid grid-cols-1 md:grid-cols-4 gap-4 text-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-700 text-xl font-bold">1</span>
              </div>
              <h3 className="font-medium text-green-800">Upload Document</h3>
              <p className="text-sm text-gray-500">
                Start by securely uploading your file
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-700 text-xl font-bold">2</span>
              </div>
              <h3 className="font-medium text-green-800">OCR Extraction</h3>
              <p className="text-sm text-gray-500">
                Text is automatically extracted from your document
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-700 text-xl font-bold">3</span>
              </div>
              <h3 className="font-medium text-green-800">PII Detection</h3>
              <p className="text-sm text-gray-500">
                Sensitive data is identified with high precision
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-700 text-xl font-bold">4</span>
              </div>
              <h3 className="font-medium text-green-800">Auto-Redaction</h3>
              <p className="text-sm text-gray-500">
                Automatically redact to protect your information
              </p>
            </div>
          </motion.div>

          {/* Conditional Rendering Based on Authentication */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col gap-2 min-[400px]:flex-row justify-center"
          >
            <SignedOut>
              <Button
                size="lg"
                variant="link"
                className="w-full text-white min-[400px]:w-auto bg-gradient-to-r from-green-900 to-blue-500 hover:from-blue-500"
                asChild
              >
                <Link href="/sign-in">
                  Sign In
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </SignedOut>

            <SignedIn>
              <Button
                size="lg"
                variant="link"
                className="w-full text-white min-[400px]:w-auto bg-gradient-to-r from-green-900 to-blue-500 hover:from-blue-500"
                asChild
              >
                <Link href="/upload">
                  Protect Your Documents
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </SignedIn>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
