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
  priceId,
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
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-amber-500/20 rounded-2xl bg-amber-50/80",
          id === "pro"
            ? "border-amber-600 gap-5 border-2 shadow-lg shadow-amber-200"
            : ""
        )}
      >
        {/* Potion bottle decorative element */}
        <div className="absolute -top-6 right-6 h-12 w-8 opacity-30">
          <div className="w-full h-2 bg-amber-800 rounded-t-full"></div>
          <div className="w-full h-6 bg-amber-700"></div>
          <div className="w-full h-4 bg-amber-600 rounded-b-lg"></div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <p className="text-lg lg:text-xl capitalize font-bold font-serif text-amber-900">
            {name}
          </p>
          <p className="text-amber-800/80 mt-2">{description}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold text-amber-900">
            {price}
          </p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold text-amber-800">
              Galleons
            </p>
            <p className="text-xs text-amber-700">/moon</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1 text-amber-800">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} className="text-amber-600" />
              <span>{item}</span>
            </li>
          ))}
        </div>

        <div className="space-y-2 flex justify-center w-full">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 text-white border-2 py-2 transition-all",
              id === "pro"
                ? "bg-gradient-to-r from-amber-800 to-red-700 hover:from-red-700 hover:to-amber-800 border-amber-600"
                : "bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-700 border-amber-500"
            )}
          >
            Cast Now <Wand2 size={18} />
          </Link>
        </div>

        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
      </div>
    </motion.div>
  );
};

// export default function PricingSection() {
//   return (
//     <section id="pricing" className="bg-amber-50/50">
//       <div
//         className="
//         py-12
//         lg-py-24
//         max-w-5xl
//         mx-auto
//         px-4
//         sm-px-6
//         lg-px-8
//         text-center
//         lg:pt-12
//       "
//       >
//         <div className="flex flex-col items-center justify-center w-full pb-12">
//           <div className="inline-flex items-center justify-center mb-4">
//             <svg
//               className="w-8 h-8 text-amber-600"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle cx="12" cy="12" r="10" />
//               <path d="M12 2v20M2 12h20" />
//               <path d="M12 12l8-8M12 12l-8 8M12 12l8 8M12 12l-8-8" />
//             </svg>
//           </div>
//           <h2 className="uppercase font-bold text-xl text-amber-600 mb-2 font-serif">
//             Enchanted Plans
//           </h2>
//           <p
//             className="
//             text-3xl
//             lg-text-3xl
//             font-bold
//             max-w-2xl
//             mx-auto
//             text-center
//             lg:mb-12
//             text-amber-900
//             font-serif
//           "
//           >
//             Choose a magical plan that works for you
//           </p>
//         </div>

//         {/* Pricing Cards Animation */}
//         <motion.div
//           className="flex relative flex-col justify-center lg:flex-row items-center lg:items-stretch gap-8"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           {plans.map((plan, index) => (
//             <PricingCard key={plan.id} {...plan} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

export default function PricingInfo() {
  return (
    <section id="pricing" className="bg-green-50/50">
      <div
        className="
        py-12
        lg-py-24
        max-w-5xl
        mx-auto
        px-4
        sm-px-6
        lg-px-8
        text-center
        lg:pt-12
      "
      >
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="inline-flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12,1L3,5v6c0,5.55,3.84,10.74,9,12c5.16-1.26,9-6.45,9-12V5L12,1z" />
            </svg>
          </div>
          <h2 className="uppercase font-bold text-xl text-green-600 mb-2 font-serif">
            Protection Plans
          </h2>
          <p
            className="
            text-3xl
            lg-text-3xl
            font-bold
            max-w-2xl
            mx-auto
            text-center
       
            text-green-900
            font-serif
          "
          >
            Choose a magical shield that works for you
          </p>
        </div>

        {/* Business Model - From the PDF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 p-6 rounded-lg mb-12 shadow-md"
        >
          <h3 className="font-serif text-xl font-bold text-green-800 mb-4">
            Business Model Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                <span className="text-green-700 text-lg">1</span>
              </div>
              <div>
                <h4 className="font-medium text-green-800">
                  Subscription-Based
                </h4>
                <p className="text-sm text-gray-600">
                  Tiered subscription plans based on features or usage
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                <span className="text-green-700 text-lg">2</span>
              </div>
              <div>
                <h4 className="font-medium text-green-800">Pay-Per-Use</h4>
                <p className="text-sm text-gray-600">
                  Charge based on the number of documents processed
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                <span className="text-green-700 text-lg">3</span>
              </div>
              <div>
                <h4 className="font-medium text-green-800">
                  Enterprise Solutions
                </h4>
                <p className="text-sm text-gray-600">
                  Customizable solutions for enterprises with higher security
                  needs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                <span className="text-green-700 text-lg">4</span>
              </div>
              <div>
                <h4 className="font-medium text-green-800">Freemium</h4>
                <p className="text-sm text-gray-600">
                  Free version with limited functionality and paid premium
                  features
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards Animation */}
        <motion.div
          className="flex relative flex-col justify-center lg:flex-row items-center lg:items-stretch gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
