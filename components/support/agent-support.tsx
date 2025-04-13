"use client";
// File: components/support/agent-support.tsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "../ui/tooltip";

// Agent.ai integration - This would be replaced with actual Agent.ai SDK
import { createAgent } from "../../lib/agent-ai";

type Message = {
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export function AgentSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        "Hello! I'm your Identity Secure assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Agent.ai instance
  const agent = new createAgent({
    name: "Identity Protection Assistant",
    knowledgeBase: "identity-protection",
    privacyLevel: "high",
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Simulate network delay for smoother UX
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Send to Agent.ai and get response
      const response = await agent.chat({
        message: userMessage.content,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
        context: {
          userName: "User", // This would be dynamic in production
          appFeatures: [
            "Document Analysis",
            "Identity Monitoring",
            "Breach Alerts",
          ],
        },
      });

      // Add agent response
      setMessages((prev) => [
        ...prev,
        {
          content: response.text,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error communicating with Agent.ai:", error);
      setMessages((prev) => [
        ...prev,
        {
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle input submission with Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Tooltip>
          <Button
            onClick={toggleChat}
            className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center"
            aria-label={isOpen ? "Close support chat" : "Open support chat"}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              )}
            </motion.div>
          </Button>
        </Tooltip>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 lg:w-96"
          >
            <Card className="shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 bg-blue-800 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 20a6 6 0 0 0-12 0"></path>
                      <circle cx="12" cy="10" r="4"></circle>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">Identity Secure</h3>
                    <p className="text-xs text-blue-100">Support Assistant</p>
                  </div>
                </div>
                <Badge className="bg-white text-blue-700 hover:bg-blue-50">
                  AI Powered
                </Badge>
              </div>

              {/* Messages area */}
              <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="max-w-[80%]">
                        {message.role === "assistant" && (
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-600"
                              >
                                <path d="M18 20a6 6 0 0 0-12 0"></path>
                                <circle cx="12" cy="10" r="4"></circle>
                                <circle cx="12" cy="12" r="10"></circle>
                              </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-700">
                              Assistant
                            </span>
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                              : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                          }`}
                        >
                          {message.content}
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            message.role === "user" ? "text-right" : ""
                          } text-gray-500`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%]">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600"
                            >
                              <path d="M18 20a6 6 0 0 0-12 0"></path>
                              <circle cx="12" cy="10" r="4"></circle>
                              <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                          </div>
                          <span className="text-xs font-medium text-gray-700">
                            Assistant
                          </span>
                        </div>
                        <div className="rounded-2xl px-4 py-3 bg-white border border-gray-200 text-gray-800 shadow-sm">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div
                  className={`flex items-center space-x-2 rounded-full bg-gray-100 px-3 py-1 ${
                    isFocused ? "ring-2 ring-blue-400" : ""
                  }`}
                >
                  <Input
                    ref={inputRef}
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 border-none bg-transparent focus:ring-0 focus-visible:ring-0 focus:outline-none shadow-none h-10"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className={`rounded-full w-8 h-8 p-0 flex items-center justify-center transition-colors ${
                      inputValue.trim() && !isLoading
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-300"
                    }`}
                    aria-label="Send message"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </Button>
                </div>
                <div className="text-xs text-center mt-2 text-gray-500">
                  Powered by Identity Secure AI •{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
