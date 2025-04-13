import React from "react";
import Link from "next/link";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-green-50 text-gray-800 py-12 border-t border-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent font-serif">
              Identity Secure
            </div>
            <p className="text-gray-700 text-sm font-serif">
              Seamlessly protect sensitive documents with intelligent, real-time
              data privacy detection. Your information, safeguarded with
              confidence.
            </p>
            <div className="pt-2">
              <Link href="/upload">
                <Button className="bg-gradient-to-r from-green-700 to-emerald-500 hover:from-green-800 hover:to-emerald-600 group">
                  Start Scanning
                  <Wand2 className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-black mb-4 font-serif">
              Platform
            </h3>
            <ul className="space-y-3 font-serif">
              <li>
                <Link
                  href="/upload"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Upload a Document
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Your Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Plans Column */}
          <div>
            <h3 className="font-semibold text-black mb-4 font-serif">
              Subscription Plans
            </h3>
            <ul className="space-y-3 font-serif">
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Basic – $9/month
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Pro – $19/month
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Compare Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-black mb-4 font-serif">
              Company
            </h3>
            <ul className="space-y-3 font-serif">
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-200 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-green-700 font-serif">
              © {new Date().getFullYear()} Identity Secure . All rights
              reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-black font-serif">
              <span>Secure. Private. Compliant.</span>
              <span>Built for Professionals</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
