import React from "react";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          About Identity Secure
        </h1>
      </header>

      <main className="pemerald pemerald-lg max-w-none">
        <h2 className="text-2xl font-bold text-black mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          At Confidential Crusaders, we're on a mission to help protect personal
          data and prevent information breaches. Our AI-powered tool scans
          documents for personally identifiable information (PII) such as Aadhar
          cards, PAN numbers, credit card information, and more. We help you
          maintain data privacy and security in an increasingly vulnerable
          digital world.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">What We Offer</h2>
          <p className="text-gray-700 mb-6">
            Get comprehensive PII detection and protection in seconds. Our
            AI-powered tool scans your documents for sensitive information and
            helps prevent data breaches before they happen.
          </p>
          <p className="text-gray-700 font-bold mb-6">
            Watch how Identity Secure secures your documents with{" "}
            <em>advanced PII detection!</em>
          </p>
          <div className="text-center">
            <span className="inline-block text-5xl mb-4">🛡️</span>
            <p className="text-gray-700 font-medium">
              Upload documents and identify sensitive information in seconds
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-black mb-6">How It Works</h2>
        <p className="text-gray-700 mb-4">
          Protect your sensitive information in three simple steps:
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-black mb-3">
              1. Upload your documents
            </h3>
            <p className="text-gray-700">
              Simply drag and drop PDFs, images, or other documents for
              scanning.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-black mb-3">
              2. Scan for PII
            </h3>
            <p className="text-gray-700">
              Our AI-powered algorithm will analyze your documents and detect
              any sensitive personal information.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-black mb-3">
              3. Review and secure
            </h3>
            <p className="text-gray-700">
              Get a detailed report and options to redact or secure the
              identified sensitive information.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-black mb-6">About Us</h2>
        <p className="text-gray-700 mb-6">
          As security experts and privacy advocates, we combine expertise in
          artificial intelligence, pattern recognition, and data protection to
          create tools that safeguard sensitive information. We're passionate
          about making digital spaces safer and protecting individuals from
          identity theft and fraud.
        </p>
      </main>

      <div className="bg-white p-8 rounded-lg shadow-sm mt-12 text-center">
        <h2 className="text-2xl font-bold text-black mb-4">
          Ready to Protect Your Sensitive Information?
        </h2>
        <p className="text-gray-700 mb-6">
          Identify and secure personally identifiable information in your
          documents with our AI-powered protection tool.
        </p>
      </div>
    </div>
  );
};

export default About;
