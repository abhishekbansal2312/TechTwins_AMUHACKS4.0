"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon, Wand2 } from "lucide-react";
import { plans } from "@/utils/constants";
import { motion } from "framer-motion";

type PriceType = {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <motion.div
      className="relative w-full max-w-lg hover:scale-105 transition-all duration-300 ease-in-out"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div
        className={cn(
          "relative flex flex-col h-full gap-6 p-8 border rounded-2xl bg-white shadow-sm",
          id === "pro"
            ? "border-green-600 shadow-lg bg-green-50"
            : "border-gray-200"
        )}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg lg:text-xl font-bold text-gray-900">{name}</p>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-extrabold text-gray-900">{price}</p>
            <p className="text-xs text-gray-500">USD / month</p>
          </div>
        </div>

        <ul className="space-y-2 text-sm text-gray-700">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckIcon size={16} className="text-green-500 mt-1" />
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={paymentLink}
          className={cn(
            "mt-auto w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-white font-semibold transition-colors",
            id === "pro"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-800 hover:bg-gray-900"
          )}
        >
          Get Started <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
};

export default function PricingInfo() {
  return (
    <section id="pricing" className="bg-gray-50">
      <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <h2 className="text-green-600 text-sm font-semibold uppercase tracking-wide">
            Pricing Plans
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            Find a plan that fits your workflow
          </p>
          <p className="mt-4 text-md text-gray-600 max-w-xl mx-auto">
            Choose from flexible pricing models designed for individual users,
            growing teams, or enterprise solutions.
          </p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          className="flex flex-col lg:flex-row justify-center items-stretch gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
