import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-700">Last Updated: April 05, 2025</p>
        </header>

        <main className="pemerald pemerald-lg max-w-none">
          <h2 className="text-2xl font-bold text-black mb-4">
            1. Introduction
          </h2>
          <p className="text-gray-700 mb-6">
            Welcome to Identity Protector's Privacy Policy. This document
            explains how we collect, use, and protect your personal information
            when you use our PII detection services. We take privacy
            seriously—it's the foundation of our business—and are committed to
            protecting your personal data. Please read this privacy policy
            carefully to understand how we handle your information.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">
            2. Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We may collect various types of information, including but not
            limited to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>
              Account information (Name, email address, phone number, etc.)
            </li>
            <li>Usage data (How you interact with our services)</li>
            <li>Document metadata (file names, types, sizes)</li>
            <li>Device and connection information</li>
            <li>Cookies and tracking technologies for service functionality</li>
          </ul>
          <p className="text-gray-700 mb-6 font-bold">
            Important Note: We do NOT permanently store the content of your
            uploaded documents or the PII detected within them unless you
            explicitly opt into our secure storage service. Document processing
            is temporary and content is deleted after analysis is complete.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            The information we collect may be used for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>To provide and maintain our PII detection services</li>
            <li>To process and analyze documents for sensitive information</li>
            <li>To generate PII detection reports</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information to improve our
              detection algorithms
            </li>
            <li>To monitor the usage of our services</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mb-4">
            4. Document Processing and PII Detection
          </h2>
          <p className="text-gray-700 mb-6">
            Our core service involves scanning documents for personally
            identifiable information. This process uses OCR technology and
            pattern recognition to identify sensitive data. All document
            processing occurs on secure servers with encryption in transit and
            at rest. Detected PII is highlighted in reports but is never stored
            in our systems beyond the temporary processing period unless you
            explicitly opt into secure storage services.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">
            5. Data Security
          </h2>
          <p className="text-gray-700 mb-6">
            The security of your data is our highest priority. We implement
            advanced technical and organizational security measures including
            end-to-end encryption, secure access controls, regular security
            audits, and compliance with industry standards. While we strive to
            use commercially acceptable means to protect your personal
            information, no method of transmission over the Internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">
            6. Third-Party Services
          </h2>
          <p className="text-gray-700 mb-6">
            Our service may utilize select third-party providers for specific
            functionalities such as OCR processing or data validation. These
            providers are bound by strict confidentiality agreements and only
            process data as necessary to provide the specific service. We do not
            sell or share your data with third parties for marketing purposes.
            Links to other sites are provided for your convenience, but we have
            no control over their privacy practices.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">
            7. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 mb-6">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and sending an email notification for significant changes. You are
            advised to review this Privacy Policy periodically for any changes.
            Changes to this Privacy Policy are effective when they are posted on
            this page.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">8. Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about this Privacy Policy, please contact
            our Data Protection Officer:
          </p>
          <ul className="list-disc pl-6 mb-8 text-gray-700">
            <li>
              By email:{" "}
              <a
                href="mailto:privacy@identityprotector.com"
                className="text-emerald-600 hover:text-emerald-600"
              >
                privacy@identityprotector.com
              </a>
            </li>
            <li>
              By phone:{" "}
              <a
                href="tel:+9897652706"
                className="text-emerald-600 hover:text-emerald-600"
              >
                +91 9897652706
              </a>
            </li>
          </ul>
        </main>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-emerald-600 text-center mb-4">
            Protecting your privacy is our core mission
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
