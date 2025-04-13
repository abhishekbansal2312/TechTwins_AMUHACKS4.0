import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-700">Last Updated: April 05, 2025</p>
        </header>

        <main className="pemerald pemerald-lg max-w-none">
          <h2 className="text-2xl font-bold text-black mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 mb-6">
            By accessing or using Identity Secure, you agree to be bound by
            these Terms of Service. If you disagree with any part of the terms,
            you may not access the service. These Terms of Service constitute
            the entire agreement between you and Identity Secure regarding the
            use of our services.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">2. Services</h2>
          <p className="text-gray-700 mb-6">
            Our service provides users with access to document scanning and PII
            detection tools designed to identify personally identifiable
            information within documents. We reserve the right to withdraw or
            amend our service, and any service or material we provide via the
            service, in our sole discretion without notice. We will not be
            liable if for any reason all or any part of the service is
            unavailable at any time or for any period.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">
            3. User Accounts
          </h2>
          <p className="text-gray-700 mb-6">
            When you create an account with us, you must provide information
            that is accurate, complete, and current at all times. Failure to do
            so constitutes a breach of the Terms, which may result in immediate
            termination of your account. You are responsible for safeguarding
            the password that you use to access the service and for any
            activities or actions under your password. You agree not to disclose
            your password to any third party. You must notify us immediately
            upon becoming aware of any breach of security or unauthorized use of
            your account.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">
            4. Data Processing and Storage
          </h2>
          <p className="text-gray-700 mb-6">
            The Identity Secure service processes documents to identify PII. We
            do not permanently store the content of your documents unless
            specifically requested through our secure storage options. All
            document processing is done securely, and we implement appropriate
            technical safeguards to protect your data during analysis. Detected
            PII is handled according to strict security protocols to prevent
            unauthorized access.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">
            5. User Content
          </h2>
          <p className="text-gray-700 mb-6">
            Our service allows you to upload documents for PII detection. You
            are responsible for the content that you upload to the service,
            including its legality and appropriateness. By uploading content to
            the service, you grant us the limited right to process and analyze
            this content solely for the purpose of providing our PII detection
            services. You retain all rights to your content, and except as
            necessary to provide the service, we will not use, modify, publicly
            perform, publicly display, reproduce, or distribute such content.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">6. Termination</h2>
          <p className="text-gray-700 mb-6">
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms. Upon termination, your right to
            use the service will immediately cease. If you wish to terminate
            your account, you may simply discontinue using the service.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">
            7. Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-6">
            In no event shall Identity Secure, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from your access to or use of
            or inability to access or use the service. We do not guarantee the
            complete detection of all PII in all documents, and users should
            verify results before making critical security decisions.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">
            8. Changes to Terms
          </h2>
          <p className="text-gray-700 mb-6">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. What constitutes a material change will be
            determined at our sole discretion. By continuing to access or use
            our service after those revisions become effective, you agree to be
            bound by the revised terms. If you do not agree to the new terms,
            please stop using the service.
          </p>

          <h2 className="text-2xl font-bold text-black mb-4">9. Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about these Terms, please contact us:
          </p>
          <ul className="list-disc pl-6 mb-8 text-gray-700">
            <li>
              By email:{" "}
              <a
                href="mailto:support@identityprotector.com"
                className="text-emerald-600 hover:text-emerald-600"
              >
                support@identityprotector.com
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
            Thank you for trusting Identity Secure to safeguard your sensitive
            information
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfService;
