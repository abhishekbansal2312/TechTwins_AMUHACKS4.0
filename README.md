# Identity Secure - AI-Powered PII Detection & Protection SaaS

#AMUHACKS4.0 #OpeningCeremony #Hackathon #CSSAMU

[[Live Demo](https://tech-twins-amuhacks-4-0.vercel.app/)]

Identity Secure is an AI-powered SaaS application built with Next.js that detects and protects personally identifiable information (PII) in uploaded documents. The application features secure document scanning, automated redaction, intelligent chatbot assistance, voice chat support, and an intuitive dashboard for managing privacy protection and compliance.

## ✨ Features

- **Multi-Format Processing**: Upload and scan PDFs, images, and text documents
- **OCR Technology**: Convert images and PDFs into analyzable text
- **PII Detection**: Identify sensitive data using regex patterns and machine learning
- **Automated Redaction**: Option to automatically redact or mask detected PII
- **AI Chatbot Assistant**: Intelligent bot for answering privacy questions and guiding users
- **Voice Chat Support**: Voice-enabled interaction for hands-free operation and accessibility
- **User Authentication**: Secure login with email/password or social providers via Clerk
- **Subscription Management**: Tiered pricing with free and premium plans via Stripe
- **Responsive Dashboard**: Intuitive interface for monitoring and reporting

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

### AI, Voice & Payments

- **Tesseract OCR**: Open-source OCR engine for text extraction
- **spaCy/HuggingFace**: NLP models for advanced PII detection
- **Web Speech API**: Browser-based speech recognition and synthesis
- **Langchain**: Framework for building context-aware chatbot experiences
- **Stripe**: Secure subscription management and payment processing

### Development Tools

- **Zod**: Type-safe form validation and data integrity
- **React Hook Form**: Efficient form state management

## 🏗️ Project Architecture

### Application Structure

```
/app
  /api           # API endpoints
  /(auth)        # Authentication pages
  /(dashboard)   # Protected dashboard routes
  /chat          # Chatbot functionality
  /voice         # Voice recognition components
/components      # Reusable UI components
/lib             # Utility functions and hooks
/public          # Static assets
```

### 🏗️ App Architecture

```
User -> Upload Document -> OCR Processing -> PII Detection -> Validation -> Redaction/Notification -> Dashboard
     -> Chat/Voice -> Intent Recognition -> Knowledge Base Query -> Response Generation -> User Interface
```

### Database Schema

The application uses a relational database with six primary tables:

- **Users**: Stores core user information and subscription status
- **Documents**: Tracks uploaded documents and processing status
- **PII_Detections**: Records identified PII instances and remediation actions
- **Payments**: Tracks all financial transactions
- **Chat_History**: Stores user-chatbot conversations for context awareness
- **Voice_Sessions**: Records voice interaction metadata and transcriptions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Clerk account for authentication
- Stripe account for payments
- NeonDB or PostgreSQL database
- Tesseract OCR or cloud OCR service (Google Vision/AWS Textract)
- OpenAI API key (for chatbot functionality)

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

# Chatbot & Voice
OPENAI_API_KEY=sk_...
NEXT_PUBLIC_ENABLE_VOICE=true

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

### Chatbot Assistant

1. Users interact with the AI-powered chatbot through text or voice
2. NLP models interpret user intent and extract key information
3. Chatbot connects to document database and knowledge base to provide context-aware answers
4. Responses are generated focusing on privacy best practices and guidance
5. Conversation history is maintained for continuity across sessions
6. Suggests relevant features based on user interactions and needs

### Voice Chat Integration

1. Implemented using Web Speech API for cross-browser compatibility
2. Voice commands enable hands-free navigation throughout the application
3. Speech-to-text conversion for document annotation and note-taking
4. Accessibility features including adjustable speech rate and pitch
5. Multi-language voice recognition for international users
6. Private voice processing with client-side recognition when possible

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
- [Stripe](https://stripe.com/)
- [UploadThing](https://uploadthing.com/)
- [OpenAI](https://openai.com/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Langchain](https://js.langchain.com/)
