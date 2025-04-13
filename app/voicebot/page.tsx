// app/(logged-in)/voicebot/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Wand2,
  Sparkles,
  Scroll,
} from "lucide-react";
import BotHandler from "@/components/voicebot/bot-handler";

// Add Web Speech API TypeScript declarations
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceBotPage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [conversation, setConversation] = useState<
    { role: string; content: string }[]
  >([
    {
      role: "bot",
      content:
        "Hello! I'm your magical AI assistant. How can I help you today?",
    },
  ]);
  const [trainingMode, setTrainingMode] = useState(false);
  const [trainingData, setTrainingData] = useState<string>("");
  const [showMagicEffect, setShowMagicEffect] = useState(false);

  // Initialize speech recognition
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Web Speech API
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const speechResult = event.results[current][0].transcript;
          setTranscript(speechResult);
        };

        recognition.onend = () => {
          if (isListening) {
            recognition.start();
          }
        };

        setRecognition(recognition);
      }
    }
  }, [isListening]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);

      // Process the final transcript
      if (transcript) {
        processUserInput(transcript);
      }
    } else {
      setTranscript("");
      recognition.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== "undefined") {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const processUserInput = async (input: string) => {
    // Add user input to conversation
    const updatedConversation = [
      ...conversation,
      { role: "user", content: input },
    ];
    setConversation(updatedConversation);
    setTranscript("");

    // Show magic effect
    setShowMagicEffect(true);
    setTimeout(() => setShowMagicEffect(false), 2000);

    try {
      // Get response from bot handler
      const botResponse = await BotHandler.processUserInput(
        input,
        updatedConversation.map((item) => ({
          role: item.role === "bot" ? "assistant" : "user",
          content: item.content,
        })),
        trainingData
      );

      // Add bot response to conversation
      const finalConversation = [
        ...updatedConversation,
        { role: "bot", content: botResponse },
      ];
      setConversation(finalConversation);
      setResponse(botResponse);

      // Speak the response
      speakText(botResponse);
    } catch (error) {
      console.error("Error processing request:", error);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setConversation([
        ...updatedConversation,
        { role: "bot", content: errorMessage },
      ]);
      speakText(errorMessage);
    }
  };

  const handleTrainingDataChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTrainingData(e.target.value);
  };

  const handleTrainModel = () => {
    // In a real implementation, you would train the model here
    setShowMagicEffect(true);
    setTimeout(() => {
      setShowMagicEffect(false);
      alert(
        "Training complete! The magical assistant will now use this wisdom to improve responses."
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-gray-900">
      <div className="container max-w-4xl mx-auto py-8 px-4 relative">
        {showMagicEffect && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="animate-pulse">
              <Sparkles className="h-32 w-32 text-green-500 opacity-50" />
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="inline-flex items-center text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            <Wand2 className="mr-2 h-8 w-8 text-green-500" />
            Magical AI Assistant
          </h1>
          <p className="text-green-700 dark:text-green-300 mb-6">
            Speak with our enchanted AI using your voice. All spells are cast
            locally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-4 border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900 transition-all duration-300 flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
              <Mic className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="font-semibold mb-2 text-green-800 dark:text-green-300">
              1. Speak Your Request
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
              Tap to start, then speak your question clearly
            </p>
            <Button
              onClick={toggleListening}
              variant={isListening ? "destructive" : "default"}
              size="lg"
              className={`mt-2 ${
                isListening ? "bg-red-600" : "bg-green-600 hover:bg-green-700"
              } text-white transition-all duration-300`}
            >
              {isListening ? (
                <MicOff className="mr-2" />
              ) : (
                <Mic className="mr-2" />
              )}
              {isListening ? "Stop Listening" : "Start Listening"}
            </Button>
          </Card>

          <Card className="p-4 border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900 transition-all duration-300 flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="font-semibold mb-2 text-green-800 dark:text-green-300">
              2. Magic at Work
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
              The enchanted AI processes your request
            </p>
            <div className="relative w-24 h-24 flex items-center justify-center">
              <Bot
                size={48}
                className="text-green-600 dark:text-green-400 z-10"
              />
              <div
                className={`absolute inset-0 rounded-full bg-green-100 dark:bg-green-800 opacity-50 ${
                  showMagicEffect ? "animate-ping" : ""
                }`}
              ></div>
            </div>
          </Card>

          <Card className="p-4 border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900 transition-all duration-300 flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
              <Volume2 className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="font-semibold mb-2 text-green-800 dark:text-green-300">
              3. Hear the Wisdom
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
              Listen to the enchanted response
            </p>
            <Button
              onClick={
                isSpeaking
                  ? stopSpeaking
                  : () => response && speakText(response)
              }
              variant={isSpeaking ? "destructive" : "outline"}
              size="lg"
              className={`mt-2 ${
                isSpeaking
                  ? "bg-red-600 text-white"
                  : "border-green-600 text-green-600 hover:bg-green-100"
              } transition-all duration-300`}
            >
              {isSpeaking ? (
                <VolumeX className="mr-2" />
              ) : (
                <Volume2 className="mr-2" />
              )}
              {isSpeaking ? "Stop Speaking" : "Repeat Response"}
            </Button>
          </Card>
        </div>

        <Card className="mb-6 p-4 border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center text-green-800 dark:text-green-300">
              <Scroll className="mr-2 h-6 w-6" />
              Magical Conversation
            </h2>
            <Badge
              variant={isListening ? "default" : "outline"}
              className={
                isListening ? "bg-green-500" : "border-green-500 text-green-500"
              }
            >
              {isListening ? "Listening..." : "Not Listening"}
            </Badge>
          </div>

          <div className="bg-green-50 dark:bg-gray-900 rounded-md p-4 h-96 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-100 dark:scrollbar-track-gray-800">
            {conversation.map((item, index) => (
              <div
                key={index}
                className={`mb-4 p-3 rounded-lg ${
                  item.role === "user"
                    ? "bg-green-100 dark:bg-green-900 ml-8 shadow-md border-l-4 border-green-600"
                    : "bg-gray-50 dark:bg-gray-800 mr-8 shadow-md border-l-4 border-green-400"
                }`}
              >
                <div className="font-semibold mb-1 flex items-center">
                  {item.role === "user" ? (
                    <>
                      You
                      <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-1 h-4 w-4 text-green-600" />
                      Magical Assistant
                    </>
                  )}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  {item.content}
                </div>
              </div>
            ))}

            {isListening && transcript && (
              <div className="mb-4 p-3 rounded-lg bg-green-100 dark:bg-green-900 ml-8 shadow-md border-l-4 border-yellow-400 animate-pulse">
                <div className="font-semibold mb-1 flex items-center">
                  You{" "}
                  <div className="ml-2 h-2 w-2 rounded-full bg-yellow-500 animate-ping"></div>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  {transcript}
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 mb-6 border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center text-green-800 dark:text-green-300">
              <Button
                variant="outline"
                size="sm"
                className="mr-2 border-green-500 text-green-600 hover:bg-green-100"
                onClick={() => setTrainingMode(!trainingMode)}
              >
                {trainingMode ? "Hide" : "Show"}
              </Button>
              <Scroll className="mr-2 h-5 w-5 text-green-600" />
              Magical Training Tome
            </h2>
          </div>

          {trainingMode && (
            <div className="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-green-50 dark:bg-gray-900">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Enhance your magical assistant by providing example
                incantations. Format: User: [question] Bot: [ideal response]
              </p>
              <textarea
                className="w-full h-40 p-3 border border-green-300 dark:border-green-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4 text-gray-800 dark:text-gray-200"
                placeholder="User: What are your hours of operation?
Bot: We're open Monday through Friday from 9 AM to 5 PM.

User: Do you offer refunds?
Bot: Yes, we offer full refunds within 30 days of purchase."
                value={trainingData}
                onChange={handleTrainingDataChange}
              />
              <Button
                onClick={handleTrainModel}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                Cast Training Spell
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
