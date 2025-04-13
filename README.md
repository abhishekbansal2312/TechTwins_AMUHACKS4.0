# Identity Secure - AI-Powered PII Detection & Protection SaaS

[![Live Demo]()]

Identity Secure is an AI-powered SaaS application built with Next.js that detects and protects personally identifiable information (PII) in uploaded documents. The application features secure document scanning, automated redaction, and an intuitive dashboard for managing privacy protection and compliance.

## ✨ Features

- **Multi-Format Processing**: Upload and scan PDFs, images, and text documents
- **OCR Technology**: Convert images and PDFs into analyzable text
- **PII Detection**: Identify sensitive data using regex patterns and machine learning
- **Automated Redaction**: Option to automatically redact or mask detected PII
- **User Authentication**: Secure login with email/password or social providers via Clerk
- **Subscription Management**: Tiered pricing with free and premium plans via Stripe
- **Responsive Dashboard**: Intuitive interface for monitoring and reporting
- **Dark/Light Mode**: Toggle between visual themes for better user experience

## 🛠️ Tech Stack

### Core Technologies

- **Next.js 15**: Server-side rendering, API routes, and optimized performance
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **Shadcn UI**: Accessible, customizable component library
- **TypeScript**: Type-safe development experience

### Authentication & Storage

- **Clerk**: Comprehensive authentication with social logins and security features
- **NeonDB**: Serverless PostgreSQL database with scalability and built-in branching
- **UploadThing**: Secure and efficient file upload service with validation

### AI & Payments

- **Tesseract OCR**: Open-source OCR engine for text extraction
- **spaCy/HuggingFace**: NLP models for advanced PII detection
- **Stripe**: Secure subscription management and payment processing

### Development Tools

- **Zod**: Type-safe form validation and data integrity
- **React Hook Form**: Efficient form state management
- **Docker**: Containerization for consistent deployment

## 🏗️ Project Architecture

### Application Structure

```
/app
  /api           # API endpoints
  /(auth)        # Authentication pages
  /(dashboard)   # Protected dashboard routes
/components      # Reusable UI components
/lib             # Utility functions and hooks
/public          # Static assets
```

### 🏗️ App Architecture

```
User -> Upload Document -> OCR Processing -> PII Detection -> Validation -> Redaction/Notification -> Dashboard
```

### Database Schema

The application uses a relational database with four primary tables:

- **Users**: Stores core user information and subscription status
- **Documents**: Tracks uploaded documents and processing status
- **PII_Detections**: Records identified PII instances and remediation actions
- **Payments**: Tracks all financial transactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Clerk account for authentication
- Stripe account for payments
- NeonDB or PostgreSQL database
- Tesseract OCR or cloud OCR service (Google Vision/AWS Textract)

### Installation

1. Clone the repository

```bash
git clone https://github.com/confidential-crusaders/identity-protector
cd identity-protector
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with the following variables:

```
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
DATABASE_URL=postgres://...

# Storage
UPLOADTHING_SECRET=sk_...
UPLOADTHING_APP_ID=...

# OCR Services
GOOGLE_VISION_API_KEY=...
# or
AWS_TEXTRACT_KEY=...
AWS_TEXTRACT_SECRET=...

# Payments
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Agent.ai
AGENT_AI_API_KEY=...
```

4. Set up the database schema:

```bash
# Using your preferred PostgreSQL client, run the schema.sql file
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Core Functionalities

### PII Detection Workflow

1. User uploads document through the dashboard
2. Backend extracts text content using OCR technology
3. PII detection algorithms identify sensitive information
4. Validation step confirms PII through checksums and context
5. Optional automatic redaction or notification of detected PII
6. Results are stored in database and displayed in dashboard

### Subscription Management

- Free tier with limited document processing per month
- Premium tier with increased limits and additional features
- Enterprise tier with customization options
- Seamless upgrade/downgrade process
- Payment history and receipts

## 🧰 Development Tools

For optimal development workflow, consider these VS Code extensions:

- **Tailwind Intellisense**: Autocomplete for Tailwind CSS classes
- **VS Code Icons**: Improved file navigation
- **Prettier**: Consistent code formatting
- **ESLint**: Code quality and standards enforcement
- **GitLens**: Enhanced Git capabilities

## 🚀 Deployment

The application is deployed on Vercel with the following configuration:

- Connected GitHub repository for continuous deployment
- Environment variables configured in Vercel dashboard
- Edge Functions for improved global performance
- Custom domain and SSL setup

## 💼 Business Model

- **Subscription-Based Model**: Tiered plans based on features or usage (Basic, Premium)
- **Pay-Per-Use**: Pricing based on number of documents processed
- **Enterprise Solutions**: Customizable options for organizations with higher security needs
- **Freemium**: Free version with limited functionality and paid premium features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/)
- [NeonDB](https://neon.tech/)
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
- [spaCy](https://spacy.io/)
- [Stripe](https://stripe.com/)
- [UploadThing](https://uploadthing.com/)
