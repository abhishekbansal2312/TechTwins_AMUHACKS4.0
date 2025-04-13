// File: lib/agent-ai.ts

// Types for Agent.ai integration
type AgentConfig = {
  name: string;
  knowledgeBase: string;
  privacyLevel: "standard" | "high";
  model?: string;
  temperature?: number;
  maxResponseTokens?: number;
};

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
};

type ChatRequest = {
  message: string;
  history: ChatMessage[];
  context?: Record<string, any>;
  analyzeIntent?: boolean;
};

type ChatResponse = {
  text: string;
  confidence: number;
  sources?: string[];
  detectedIntent?: string;
  suggestedFollowUp?: string[];
};

type DocumentAnalysisResult = {
  risks: RiskFinding[];
  recommendations: string[];
  sensitiveInformation: SensitiveInfoDetection[];
  securityScore: number;
};

type RiskFinding = {
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  location?: string;
};

type SensitiveInfoDetection = {
  type: string;
  count: number;
  examples?: string[];
  recommendation: string;
};

// A more dynamic Agent.ai client
class AgentAI {
  private config: AgentConfig;
  private apiKey: string;
  private conversationContext: Map<string, any> = new Map();
  private llmClient: LLMClient;

  constructor(config: AgentConfig) {
    this.config = {
      ...config,
      temperature: config.temperature || 0.7,
      maxResponseTokens: config.maxResponseTokens || 1024,
    };

    // In production, you'd use environment variables for the API key
    this.apiKey =
      process.env.AGENT_AI_API_KEY ||
      "zuCvzqEsfW65bLZ1P8pLEnz1FopxQFj1iSmIZ90UjSjfEisMvoGgmp3RLISCKLJc";

    // Initialize the LLM client
    this.llmClient = new LLMClient(this.apiKey, config.model || "gpt-4");

    // Initialize the conversation with product knowledge
    this.initializeKnowledgeBase(config.knowledgeBase);
  }

  // Initialize the knowledge base
  private async initializeKnowledgeBase(
    knowledgeBaseId: string
  ): Promise<void> {
    try {
      // In a real implementation, this would fetch knowledge from an API
      const knowledgeBase = await this.llmClient.fetchKnowledgeBase(
        knowledgeBaseId
      );
      this.updateContext("knowledgeBase", knowledgeBase);
    } catch (error) {
      console.error("Error initializing knowledge base:", error);
      // Set fallback knowledge if API fails
      this.updateContext("knowledgeBase", {
        productName: "Identity Secure",
        productVersion: "2.5.3",
        domain: "identity protection",
        primaryFeatures: [
          "document analysis",
          "identity monitoring",
          "breach alerts",
        ],
      });
    }
  }

  // Method to handle chat interactions
  async chat(request: ChatRequest): Promise<ChatResponse> {
    try {
      // Add timestamp to the request if not present
      if (
        !request.history.length ||
        !request.history[request.history.length - 1].timestamp
      ) {
        const now = new Date();
        if (request.history.length) {
          request.history[request.history.length - 1].timestamp =
            now.toISOString();
        }
      }

      // Process the user's input to understand context and intent
      const processingResult = await this.processUserInput(request);

      // Update conversation context
      this.updateContext("lastQuery", request.message);
      this.updateContext("lastIntent", processingResult.intent);
      this.updateContext(
        "messageCount",
        (this.getContext("messageCount") || 0) + 1
      );

      // Extract entities and update context
      if (processingResult.entities) {
        for (const [key, value] of Object.entries(processingResult.entities)) {
          this.updateContext(key, value);
        }
      }

      // Generate a natural language response
      const responseData = await this.generateResponse(
        request,
        processingResult
      );

      // Generate follow-up questions contextually
      const followUpQuestions = await this.generateFollowUpQuestions(
        processingResult.intent,
        responseData.text,
        request.history
      );

      // Process and store conversation memory
      this.processConversationMemory(request, responseData.text);

      return {
        text: responseData.text,
        confidence: responseData.confidence,
        sources: responseData.sources,
        detectedIntent: processingResult.intent,
        suggestedFollowUp: followUpQuestions,
      };
    } catch (error) {
      console.error("Error in Agent.ai chat:", error);
      return {
        text: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        confidence: 0.5,
        detectedIntent: "error",
      };
    }
  }

  // Process user input to understand intent and extract entities
  private async processUserInput(request: ChatRequest): Promise<{
    intent: string;
    confidence: number;
    entities?: Record<string, any>;
  }> {
    // Format conversation history for the LLM
    const formattedHistory = request.history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add system prompt to guide the LLM
    const systemPrompt = `You are an AI assistant for ${this.config.name}. 
    Analyze the user's message to determine their intent and extract relevant entities.
    Respond in JSON format with intent, confidence, and entities.`;

    try {
      // Call the LLM to analyze the input
      const result = await this.llmClient.complete({
        messages: [
          { role: "system", content: systemPrompt },
          ...formattedHistory,
          { role: "user", content: request.message },
        ],
        temperature: 0.3, // Lower temperature for more deterministic analysis
        response_format: { type: "json_object" },
      });

      // Parse the LLM response
      const analysis = JSON.parse(result.text);

      return {
        intent: analysis.intent || "general",
        confidence: analysis.confidence || 0.7,
        entities: analysis.entities || {},
      };
    } catch (error) {
      console.error("Error analyzing user input:", error);

      // Fallback to simple intent detection
      const intent = this.simpleIntentDetection(request.message);
      return {
        intent,
        confidence: 0.6,
      };
    }
  }

  // Simple intent detection as fallback
  private simpleIntentDetection(message: string): string {
    const normalizedMessage = message.toLowerCase();

    // Simple keyword matching
    if (/^(hi|hello|hey|greetings).*/i.test(normalizedMessage)) {
      return "greeting";
    } else if (/^(bye|goodbye|see you|talk later).*/i.test(normalizedMessage)) {
      return "farewell";
    } else if (/help|how (can|do) I|guide|tutorial/i.test(normalizedMessage)) {
      return "help";
    } else if (
      /features|what (can|does).*(do|offer)/i.test(normalizedMessage)
    ) {
      return "features";
    } else if (/price|cost|subscription|plan/i.test(normalizedMessage)) {
      return "pricing";
    } else if (/security|privacy|data protection/i.test(normalizedMessage)) {
      return "security";
    } else if (/error|issue|problem|bug|glitch/i.test(normalizedMessage)) {
      return "technical";
    } else if (/account|sign (in|up)|login|register/i.test(normalizedMessage)) {
      return "account";
    } else if (/document|upload|scan|analyze/i.test(normalizedMessage)) {
      return "document";
    } else if (
      /identity theft|stolen identity|fraud/i.test(normalizedMessage)
    ) {
      return "identity_theft";
    } else if (/compare|versus|vs\.?|better than/i.test(normalizedMessage)) {
      return "comparison";
    }

    return "general";
  }

  // Generate a natural language response
  private async generateResponse(
    request: ChatRequest,
    processingResult: {
      intent: string;
      confidence: number;
      entities?: Record<string, any>;
    }
  ): Promise<{ text: string; confidence: number; sources?: string[] }> {
    // Get product knowledge
    const knowledgeBase = this.getContext("knowledgeBase") || {};

    // Format conversation history
    const formattedHistory = request.history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Create a system prompt based on the detected intent
    let systemPrompt = `You are an AI assistant for ${
      this.config.name
    }, a service in the ${knowledgeBase.domain || "identity protection"} domain.
    The user's intent appears to be: ${processingResult.intent}.
    Your response should be helpful, conversational, and natural.
    Key product information: ${
      knowledgeBase.productName || "Identity Secure"
    } version ${knowledgeBase.productVersion || "2.5.3"}.
    Primary features include: ${(
      knowledgeBase.primaryFeatures || [
        "document analysis",
        "identity monitoring",
        "breach alerts",
      ]
    ).join(", ")}.`;

    // Add intent-specific guidance
    switch (processingResult.intent) {
      case "greeting":
        systemPrompt += `\nProvide a friendly greeting and brief introduction to the service.`;
        break;
      case "farewell":
        systemPrompt += `\nAcknowledge the farewell and express appreciation for the conversation.`;
        break;
      case "help":
        systemPrompt += `\nOffer clear guidance on how to use key features of the product.`;
        break;
      case "features":
        systemPrompt += `\nExplain the main features of the product, highlighting their benefits.`;
        break;
      case "pricing":
        systemPrompt += `\nDescribe the pricing tiers available: Free ($0/month), Standard ($9.99/month), Premium ($19.99/month), and Enterprise (custom pricing).`;
        break;
      case "security":
        systemPrompt += `\nExplain the security measures in place, including end-to-end encryption, compliance certifications, and data handling policies.`;
        break;
      case "technical":
        systemPrompt += `\nOffer troubleshooting steps for common issues and direct to support channels for complex problems.`;
        break;
    }

    // Add personalization based on conversation context
    const messageCount = this.getContext("messageCount") || 0;
    const userName = this.getContext("userName");
    if (userName) {
      systemPrompt += `\nThe user's name is ${userName}. Use their name occasionally for personalization.`;
    }
    if (messageCount > 5) {
      systemPrompt += `\nThis is conversation message #${messageCount}, so use a more casual and familiar tone.`;
    }

    try {
      // Call the LLM to generate the response
      const result = await this.llmClient.complete({
        messages: [
          { role: "system", content: systemPrompt },
          ...formattedHistory,
          { role: "user", content: request.message },
        ],
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxResponseTokens,
      });

      // Determine sources based on intent
      let sources: string[] = [];
      switch (processingResult.intent) {
        case "features":
          sources = ["Product Documentation"];
          break;
        case "pricing":
          sources = ["Pricing Page"];
          break;
        case "security":
          sources = ["Security Documentation", "Privacy Policy"];
          break;
        case "document":
          sources = ["Document Analysis Guide"];
          break;
        case "identity_theft":
          sources = ["Identity Theft Protection Guide"];
          break;
        case "comparison":
          sources = ["Competitive Analysis", "Industry Reports"];
          break;
      }

      return {
        text: result.text,
        confidence: processingResult.confidence,
        sources,
      };
    } catch (error) {
      console.error("Error generating response:", error);

      // Fallback response
      const personalizedGreeting = userName ? `Hi ${userName}! ` : "";
      return {
        text: `${personalizedGreeting}I understand you're asking about ${processingResult.intent.replace(
          "_",
          " "
        )}. Could you please rephrase your question so I can provide you with the most helpful information?`,
        confidence: 0.5,
      };
    }
  }

  // Process and store conversation memory
  private processConversationMemory(
    request: ChatRequest,
    response: string
  ): void {
    // Extract potential name if we don't have it yet
    if (!this.getContext("userName")) {
      const nameMatch = request.message.match(
        /(?:my name is|I am|I'm) ([A-Z][a-z]+(?: [A-Z][a-z]+)?)/i
      );
      if (nameMatch && nameMatch[1]) {
        this.updateContext("userName", nameMatch[1]);
      }
    }

    // Extract topics of interest
    const topics = ["security", "pricing", "document", "identity theft"];
    topics.forEach((topic) => {
      if (request.message.toLowerCase().includes(topic)) {
        const interests = this.getContext("interests") || [];
        if (!interests.includes(topic)) {
          interests.push(topic);
          this.updateContext("interests", interests);
        }
      }
    });

    // Add current exchange to conversation history
    const history = this.getContext("conversationHistory") || [];
    history.push({
      user: request.message,
      assistant: response,
      timestamp: new Date().toISOString(),
    });

    // Keep only last 10 exchanges
    if (history.length > 10) {
      history.shift();
    }

    this.updateContext("conversationHistory", history);
  }

  // Generate contextual follow-up questions
  private async generateFollowUpQuestions(
    intent: string,
    response: string,
    history: ChatMessage[]
  ): Promise<string[]> {
    try {
      // For simple cases, use predefined follow-ups
      const basicFollowUps: Record<string, string[]> = {
        greeting: [
          "What features does Identity Secure offer?",
          "How does document analysis work?",
          "What are your pricing plans?",
        ],
        features: [
          "How does the document analysis feature work?",
          "Can you tell me about the dark web monitoring?",
          "What security measures do you use to protect my data?",
        ],
        pricing: [
          "What's included in the Premium plan?",
          "Do you offer a free trial?",
          "Are there any discounts for annual subscriptions?",
        ],
      };

      // If we have basic follow-ups for this intent, use them
      if (basicFollowUps[intent]) {
        return basicFollowUps[intent];
      }

      // For more complex cases, use the LLM to generate contextual follow-ups
      const systemPrompt = `Based on the conversation history and the assistant's last response, 
      generate 3 natural, contextually relevant follow-up questions that the user might want to ask next. 
      These should be questions that would help the user learn more about the topic or take a next step.
      Format the response as a JSON array of strings.`;

      // Get recent history (last 3 exchanges)
      const recentHistory = history.slice(-6);

      // Add the latest response
      recentHistory.push({
        role: "assistant",
        content: response,
      });

      const result = await this.llmClient.complete({
        messages: [{ role: "system", content: systemPrompt }, ...recentHistory],
        temperature: 0.7,
        response_format: { type: "json_object" },
      });

      // Parse the result
      try {
        const parsed = JSON.parse(result.text);
        if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          return parsed.questions.slice(0, 3);
        }
        return JSON.parse(result.text);
      } catch (e) {
        // If parsing fails, extract questions using regex
        const questions = result.text.match(/"([^"]+)"/g);
        if (questions && questions.length > 0) {
          return questions.map((q) => q.replace(/"/g, "")).slice(0, 3);
        }
      }
    } catch (error) {
      console.error("Error generating follow-up questions:", error);
    }

    // Fallback follow-ups
    return [
      "What other questions do you have about identity protection?",
      "Would you like to know about our security features?",
      "Do you need help with a specific aspect of our service?",
    ];
  }

  // Context management methods
  private updateContext(key: string, value: any): void {
    this.conversationContext.set(key, value);
  }

  private getContext(key: string): any {
    return this.conversationContext.get(key);
  }

  // Method to handle document analysis with enhanced capabilities
  async analyzeDocument(
    documentText: string,
    documentType?: string
  ): Promise<DocumentAnalysisResult> {
    try {
      // Create a system prompt for document analysis
      const systemPrompt = `You are a document security analyzer. 
      Analyze the provided document text for sensitive information such as:
      - Email addresses
      - Phone numbers
      - Social Security Numbers
      - Credit card numbers
      - Physical addresses
      - Dates of birth
      
      For each type of sensitive information found, provide:
      1. The type of information
      2. The number of instances found
      3. Example instances (masked appropriately)
      4. Severity level (low/medium/high/critical)
      5. Recommendations for handling this information
      
      Also calculate an overall security score from 0-100 where lower means more risk.
      Format your response as a JSON object.`;

      // Call the LLM for document analysis
      const result = await this.llmClient.complete({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Document type: ${
              documentType || "general"
            }\n\nDocument content:\n${documentText}`,
          },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      });

      try {
        // Parse the LLM response
        const analysis = JSON.parse(result.text);

        // Format into our expected return type
        const sensitiveInformation: SensitiveInfoDetection[] = [];
        const risks: RiskFinding[] = [];

        // Process sensitive information findings
        if (analysis.sensitiveInformation) {
          for (const item of analysis.sensitiveInformation) {
            sensitiveInformation.push({
              type: item.type,
              count: item.count,
              examples: item.examples,
              recommendation: item.recommendation,
            });

            // Add corresponding risk
            risks.push({
              type: `Exposed ${item.type}`,
              severity: item.severity || "medium",
              description: `Found ${item.count} instance${
                item.count > 1 ? "s" : ""
              } of ${item.type} information`,
            });
          }
        }

        // Add any additional risks
        if (analysis.additionalRisks) {
          for (const risk of analysis.additionalRisks) {
            risks.push({
              type: risk.type,
              severity: risk.severity,
              description: risk.description,
            });
          }
        }

        return {
          risks,
          recommendations: analysis.recommendations || [],
          sensitiveInformation,
          securityScore: analysis.securityScore || 50,
        };
      } catch (error) {
        console.error("Error parsing document analysis:", error);
        throw new Error("Failed to parse document analysis results");
      }
    } catch (error) {
      console.error("Error in document analysis:", error);
      throw error;
    }
  }
}

// LLM client to handle API communication
class LLMClient {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.apiKey = apiKey;
    this.model = model;
  }

  async complete({
    messages,
    temperature = 0.7,
    max_tokens = 1024,
    response_format = undefined,
  }: {
    messages: Array<{ role: string; content: string }>;
    temperature?: number;
    max_tokens?: number;
    response_format?: { type: string } | undefined;
  }): Promise<{ text: string }> {
    // In a real implementation, this would make an API call
    // For now, we'll simulate a response based on the messages

    // Extract the last user message
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();

    if (!lastUserMessage) {
      return { text: "I couldn't understand your request. Please try again." };
    }

    // Simple response generation based on content
    // In a real implementation, this would be handled by the LLM API
    const userContent = lastUserMessage.content.toLowerCase();

    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate a simulated response
    let responseText = "";

    if (userContent.includes("hello") || userContent.includes("hi")) {
      responseText =
        "Hello! I'm your Identity Secure assistant. How can I help you today?";
    } else if (userContent.includes("feature")) {
      responseText =
        "Identity Secure offers several key features:\n\n" +
        "• Document Analysis for scanning sensitive information\n" +
        "• Real-time Monitoring for identity threats\n" +
        "• Breach Alerts to notify you immediately of compromised data\n" +
        "• Credit Monitoring integration\n\n" +
        "Which feature would you like to learn more about?";
    } else if (userContent.includes("price") || userContent.includes("cost")) {
      responseText =
        "We offer several pricing tiers:\n\n" +
        "• Free: $0/month - Basic document analysis and alerts\n" +
        "• Standard: $9.99/month - Enhanced protection and 50 document scans\n" +
        "• Premium: $19.99/month - Full protection including dark web monitoring\n" +
        "• Enterprise: Custom pricing for organizations\n\n" +
        "All paid plans include a 14-day free trial.";
    } else if (
      userContent.includes("secure") ||
      userContent.includes("security")
    ) {
      responseText =
        "Security is our top priority. We use end-to-end encryption for all data, and we're compliant with major regulations like GDPR and HIPAA. Your documents are only processed in memory and never stored permanently unless you explicitly save them to your secure vault.";
    } else if (
      userContent.includes("document") ||
      userContent.includes("scan")
    ) {
      responseText =
        "Our document analysis feature uses advanced AI to detect sensitive information like SSNs, credit card numbers, addresses, and more. You can upload documents through our secure portal, and we'll provide a detailed risk report with recommendations for securing your information.";
    } else if (response_format?.type === "json_object") {
      // If JSON is requested, return a simple JSON structure
      if (userContent.includes("intent") || userContent.includes("analyze")) {
        responseText =
          '{"intent": "inquiry", "confidence": 0.85, "entities": {"topic": "security"}}';
      } else if (
        userContent.includes("document") ||
        userContent.includes("analyze")
      ) {
        responseText =
          '{"sensitiveInformation": [{"type": "email", "count": 2, "examples": ["j***@example.com"], "severity": "medium", "recommendation": "Use masked emails"}], "securityScore": 75, "recommendations": ["Remove personal identifiers", "Use generic contact information"]}';
      } else {
        responseText =
          '{"questions": ["What specific features are you interested in?", "Do you need help with document security?", "Would you like to know about our pricing plans?"]}';
      }
    } else {
      responseText =
        "I'm here to help with all your identity protection needs. Could you tell me more about what you're looking for? I can provide information about our features, pricing, security practices, or help troubleshoot issues you might be experiencing.";
    }

    return { text: responseText };
  }

  async fetchKnowledgeBase(knowledgeBaseId: string): Promise<any> {
    // Simulate fetching knowledge base data
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Return mock knowledge base data
    return {
      productName: "Identity Secure",
      productVersion: "2.5.3",
      domain: "identity protection and document security",
      primaryFeatures: [
        "AI-powered document analysis",
        "Real-time identity monitoring",
        "Breach alerts and notifications",
        "Dark web scanning",
        "Credit monitoring integration",
      ],
      pricing: {
        free: {
          price: "$0/month",
          features: ["Basic analysis", "Limited alerts"],
        },
        standard: {
          price: "$9.99/month",
          features: ["Enhanced analysis", "50 scans/month"],
        },
        premium: {
          price: "$19.99/month",
          features: ["Unlimited analysis", "Dark web monitoring"],
        },
        enterprise: {
          price: "Custom",
          features: ["API access", "Custom integration"],
        },
      },
      security: {
        encryption: "End-to-end AES-256",
        compliance: ["SOC 2", "GDPR", "HIPAA"],
        dataHandling: "No permanent storage of analyzed documents",
      },
    };
  }
}

// Factory function to create Agent.ai instances
export function createAgent(config: AgentConfig) {
  return new AgentAI(config);
}

// Usage example:
// const agent = createAgent({
//   name: "Identity Protection Assistant",
//   knowledgeBase: "identity_protection_kb",
//   privacyLevel: "high",
//   model: "gpt-4"
// });
//
// async function main() {
//   const response = await agent.chat({
//     message: "How secure are my documents with your service?",
//     history: []
//   });
//   console.log(response);
// }
