// components/voicebot/bot-handler.tsx
"use client";

interface ConversationMessage {
  role: string;
  content: string;
}

// Process training data
function extractTrainingExamples(
  trainingData: string
): { input: string; output: string }[] {
  if (!trainingData) return [];

  const examples: { input: string; output: string }[] = [];
  const lines = trainingData.split("\n");

  let currentInput = "";
  let currentOutput = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("User:")) {
      // If we have a previous complete example, save it
      if (currentInput && currentOutput) {
        examples.push({ input: currentInput, output: currentOutput });
        currentInput = "";
        currentOutput = "";
      }

      // Extract the new input
      currentInput = line.substring(5).trim();
    } else if (line.startsWith("Bot:")) {
      currentOutput = line.substring(4).trim();
    } else if (line === "" && currentInput && currentOutput) {
      // Empty line indicates end of an example
      examples.push({ input: currentInput, output: currentOutput });
      currentInput = "";
      currentOutput = "";
    }
  }

  // Add the last example if it exists
  if (currentInput && currentOutput) {
    examples.push({ input: currentInput, output: currentOutput });
  }

  return examples;
}

// Function to match user input with training examples
function findBestMatchingExample(
  input: string,
  examples: { input: string; output: string }[]
): string | null {
  if (!examples.length) return null;

  // Very simple matching algorithm - could be enhanced with embeddings or more complex NLP
  let bestMatch = null;
  let highestScore = -1;

  for (const example of examples) {
    // Calculate simple word overlap score
    const inputWords = input.toLowerCase().split(/\s+/);
    const exampleWords = example.input.toLowerCase().split(/\s+/);

    const commonWords = inputWords.filter((word) =>
      exampleWords.includes(word)
    );
    const score =
      commonWords.length / Math.max(inputWords.length, exampleWords.length);

    if (score > highestScore && score > 0.3) {
      // Threshold to consider a match
      highestScore = score;
      bestMatch = example.output;
    }
  }

  return bestMatch;
}

// Simple rule-based response generation
function generateBasicResponse(
  input: string,
  history: ConversationMessage[]
): string {
  const lowerInput = input.toLowerCase();

  // Simple intent detection
  if (
    lowerInput.includes("hello") ||
    lowerInput.includes("hi ") ||
    lowerInput.includes("hey")
  ) {
    return "Hello! How can I help you with our identity protection services today?";
  } else if (
    lowerInput.includes("price") ||
    lowerInput.includes("cost") ||
    lowerInput.includes("pay")
  ) {
    return "Our plans start at $9.99/month for basic protection. Business plans are also available. Would you like more details about specific features?";
  } else if (
    lowerInput.includes("feature") ||
    lowerInput.includes("what") ||
    lowerInput.includes("can you do")
  ) {
    return "Our service can identify and redact personal information in documents, analyze privacy risks, and provide secure storage. Is there a specific feature you'd like to know more about?";
  } else if (
    lowerInput.includes("document") ||
    lowerInput.includes("file") ||
    lowerInput.includes("upload")
  ) {
    return "We can process PDF and Word documents to identify and protect sensitive information. You can upload documents in your dashboard after signing up.";
  } else if (lowerInput.includes("how does") || lowerInput.includes("how do")) {
    return "Our AI scans your documents for personal information like names, addresses, and financial details, then redacts or encrypts that information based on your preferences. Would you like me to explain a specific part of the process?";
  } else if (lowerInput.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with today?";
  } else if (lowerInput.includes("bye") || lowerInput.includes("goodbye")) {
    return "Thank you for your interest in our identity protection services. Have a great day!";
  }

  // Default response if no pattern matches
  return "That's an interesting question about our identity protection service. Could you provide more details about what you're looking for so I can give you the most accurate information?";
}
const BotHandler = {
  processUserInput: async (
    input: string,
    history: ConversationMessage[],
    trainingData: string
  ): Promise<string> => {
    try {
      // Function implementation stays the same...
      const examples = extractTrainingExamples(trainingData);
      const matchedResponse = findBestMatchingExample(input, examples);

      if (matchedResponse) {
        return matchedResponse;
      }

      return generateBasicResponse(input, history);
    } catch (error) {
      console.error("Error in bot processing:", error);
      return "I'm sorry, I encountered an error. Could you try asking your question in a different way?";
    }
  },
};

export default BotHandler;
