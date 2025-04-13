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
  MessageCircle,
  Info,
  Send,
  User,
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
      content: "Hello! I'm your AI voice assistant. How can I help you today?",
    },
  ]);

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

    try {
      // Get response from bot handler
      const botResponse = await BotHandler.processUserInput(
        input,
        updatedConversation.map((item) => ({
          role: item.role === "bot" ? "assistant" : "user",
          content: item.content,
        })),
        ""
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

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Left sidebar - Introduction */}
      <div className="w-1/3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block">
        <div className="p-4 bg-teal-600 dark:bg-teal-800 text-white">
          <h1 className="text-xl font-bold mb-1 flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Voice Assistant
          </h1>
          <p className="text-sm opacity-90">Powered by AI</p>
        </div>

        <div className="p-6">
          <Card className="bg-gray-50 dark:bg-gray-700 p-4 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 flex items-center text-teal-700 dark:text-teal-300">
              <Info className="mr-2 h-4 w-4" />
              About This Assistant
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              This voice assistant uses Web Speech API to convert your speech to
              text and process your requests in real-time.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>Ask questions by speaking naturally</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>Get instant AI-powered responses</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>Hear responses read back to you</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>All processing happens on your device</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-700 p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 flex items-center text-teal-700 dark:text-teal-300">
              <Mic className="mr-2 h-4 w-4" />
              How To Use
            </h2>
            <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">
                  1
                </span>
                <span>Click the microphone button to start listening</span>
              </li>
              <li className="flex items-start">
                <span className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">
                  2
                </span>
                <span>Speak your question or request clearly</span>
              </li>
              <li className="flex items-start">
                <span className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">
                  3
                </span>
                <span>Click the microphone again to process your request</span>
              </li>
              <li className="flex items-start">
                <span className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">
                  4
                </span>
                <span>Listen to the response or read it in the chat</span>
              </li>
            </ol>
          </Card>
        </div>
      </div>

      {/* Main chat area - WhatsApp style */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat header */}
        <div className="bg-teal-600 dark:bg-teal-800 p-3 text-white flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="h-8 w-8 mr-2 p-1 bg-white text-teal-600 rounded-full" />
            <div>
              <h2 className="font-medium">AI Assistant</h2>
              <p className="text-xs opacity-80">
                {isListening
                  ? "Listening..."
                  : isSpeaking
                  ? "Speaking..."
                  : "Online"}
              </p>
            </div>
          </div>
          <div>
            <Button
              onClick={
                isSpeaking
                  ? stopSpeaking
                  : () => response && speakText(response)
              }
              variant="ghost"
              size="sm"
              className="text-white hover:bg-teal-700"
            >
              {isSpeaking ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#e5ded8] dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-60 bg-[url('/whatsapp-bg.png')] bg-repeat">
          {conversation.map((item, index) => (
            <div
              key={index}
              className={`mb-4 max-w-xs ${
                item.role === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`p-3 rounded-lg shadow-sm ${
                  item.role === "user"
                    ? "bg-teal-100 dark:bg-teal-700 rounded-tr-none"
                    : "bg-white dark:bg-gray-800 rounded-tl-none"
                }`}
              >
                <div className="text-gray-800 dark:text-gray-200 text-sm">
                  {item.content}
                </div>
                <div className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {item.role === "user" && (
                    <span className="ml-1 text-teal-600 dark:text-teal-400">
                      ✓✓
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isListening && transcript && (
            <div className="mb-4 max-w-xs ml-auto">
              <div className="p-3 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-700 rounded-tr-none border-teal-200 dark:border-teal-600 opacity-75">
                <div className="text-gray-700 dark:text-gray-300 text-sm italic">
                  {transcript}
                </div>
                <div className="flex justify-end items-center mt-1 text-xs text-gray-500">
                  <span className="mr-1">Recording</span>
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="bg-white dark:bg-gray-800 p-3 border-t border-gray-200 dark:border-gray-700 flex items-center">
          <Button
            onClick={toggleListening}
            variant="ghost"
            size="icon"
            className={`rounded-full h-10 w-10 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-teal-500 hover:bg-teal-600 text-white"
            }`}
          >
            {isListening ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>

          <div className="flex-1 mx-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-500 dark:text-gray-300 flex items-center">
            {isListening ? (
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
                <span>Listening... {transcript ? "Tap mic to send" : ""}</span>
              </div>
            ) : (
              <span>Tap the microphone to speak</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full h-10 w-10 bg-teal-500 hover:bg-teal-600 text-white ${
              !isListening || !transcript ? "opacity-50" : ""
            }`}
            onClick={() => {
              if (isListening && transcript) {
                toggleListening(); // Stop listening and process
              }
            }}
            disabled={!isListening || !transcript}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
