// header.jsx - Server Component
import React from "react";
import { Shield } from "lucide-react";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./plan-badge";
import ClientSideButtons from "./client-side-buttons";

export default function Header() {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto border-b border-green-200">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <Shield className="w-5 h-5 lg:w-8 lg:h-8 text-green-600 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-sans font-extrabold lg:text-xl text-gray-900 bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
            Identity Secure
          </span>
        </NavLink>
      </div>

      <div className="flex lg:flex-1 justify-center gap-4 lg:items-center lg:gap-4">
        <NavLink href="/journey" className="font-sans hover:text-green-600">
          Demo
        </NavLink>
        <NavLink href="/#pricing" className="font-sans hover:text-green-600">
          Pricing
        </NavLink>
        <SignedIn>
          <NavLink href="/dashboard" className="font-sans hover:text-green-600">
            Dashboard
          </NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex lg:gap-4 gap-2 items-center">
            <ClientSideButtons variant="upload" />
            <PlanBadge />
            <div className="bg-green-50 p-1 rounded-full border border-green-200">
              <UserButton />
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex lg:gap-4 gap-2 items-center">
            <ClientSideButtons variant="auth" />
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}
