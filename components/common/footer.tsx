import React from "react";
import Link from "next/link";
import { ArrowRight, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-green-50 text-gray-800 py-12 border-t border-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent font-serif">
              The Slytherin Secrets
            </div>
            <p className="text-gray-700 text-sm font-serif">
              Protect your parchments with cunning precision. Our sophisticated
              enchantments detect personally identifiable information with
              pure-blood discretion.
            </p>
            <div className="pt-2">
              <Link href="/upload">
                <Button className="bg-gradient-to-r from-green-700 to-emerald-500 hover:from-green-800 hover:to-emerald-600 group">
                  Cast Detection Charm
                  <Wand2 className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-black mb-4 font-serif">
              Cunning Services
            </h3>
            <ul className="space-y-3 font-serif">
              <li>
                <Link
                  href="/upload"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Upload a Parchment
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  How The Enchantment Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Secret Chamber Access
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Your Protection Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Plans Column */}
          <div>
            <h3 className="font-semibold text-black mb-4 font-serif">
              Ambitious Plans
            </h3>
            <ul className="space-y-3 font-serif">
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Serpent - 9 Galleons/month
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Basilisk - 19 Galleons/month
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Enchantment Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-black mb-4 font-serif">
              Pure-Blood Affairs
            </h3>
            <ul className="space-y-3 font-serif">
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  About Our Society
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Send a Patronus
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Secrecy Statute
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Terms of Magical Binding
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-200 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-green-700 font-serif">
              © {new Date().getFullYear()} Confidential Crusaders. Protected by
              ancient magic.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-black font-serif">
              <span>Powered by Dark Arts Defense</span>
              <span>Salazar-Approved Protection</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
