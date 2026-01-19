"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: string;
  question: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
}

const questions: Question[] = [
  {
    id: "name",
    question: "Hey there! 👋 What's your name?",
    type: "text",
    placeholder: "Type your name...",
  },
  {
    id: "email",
    question: "Nice to meet you, {name}! What's your email?",
    type: "email",
    placeholder: "your@email.com",
  },
  {
    id: "project",
    question: "What type of project are you looking to build?",
    type: "select",
    options: ["Web Application", "Mobile App", "E-commerce", "Landing Page", "Something Else"],
  },
  {
    id: "budget",
    question: "What's your budget range?",
    type: "select",
    options: ["$5k - $15k", "$15k - $50k", "$50k - $100k", "$100k+", "Let's discuss"],
  },
  {
    id: "details",
    question: "Tell us more about your vision. What makes your project special?",
    type: "textarea",
    placeholder: "Share your ideas...",
  },
];

interface Message {
  type: "bot" | "user";
  content: string;
}

export function ConversationalForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Show first question
    if (messages.length === 0) {
      addBotMessage(questions[0].question);
    }
  }, []);

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", content }]);
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 500);
  };

  const processAnswer = (answer: string) => {
    const currentQuestion = questions[currentStep];
    
    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: answer }]);
    
    // Store answer
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);
    setInputValue("");

    // Move to next question or complete
    if (currentStep < questions.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // Replace {name} placeholder if exists
      let nextQuestion = questions[nextStep].question;
      if (nextQuestion.includes("{name}")) {
        nextQuestion = nextQuestion.replace("{name}", newAnswers.name || "friend");
      }
      
      setTimeout(() => addBotMessage(nextQuestion), 300);
    } else {
      // Form complete
      setIsComplete(true);
      setTimeout(() => {
        addBotMessage("🚀 Awesome! We've received your message. Our team will reach out within 24 hours. Get ready to build something amazing!");
      }, 300);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isComplete) {
      processAnswer(inputValue.trim());
    }
  };

  const handleOptionSelect = (option: string) => {
    if (!isComplete) {
      processAnswer(option);
    }
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Messages Container */}
      <div className="min-h-[400px] max-h-[500px] overflow-y-auto mb-6 space-y-4 pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-6 py-4 rounded-2xl ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30"
                    : "glass"
                }`}
              >
                <p className={`text-base ${message.type === "user" ? "text-neon-cyan" : "text-white/90"}`}>
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="glass px-6 py-4 rounded-2xl">
                <div className="flex gap-1.5">
                  <motion.span
                    className="w-2 h-2 bg-neon-cyan rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-neon-cyan rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-neon-cyan rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {!isComplete && !isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {currentQuestion?.type === "select" ? (
            <div className="flex flex-wrap gap-3">
              {currentQuestion.options?.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleOptionSelect(option)}
                  className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-neon-cyan/50 transition-all duration-300 text-sm"
                  data-cursor-hover
                >
                  {option}
                </motion.button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative">
              {currentQuestion?.type === "textarea" ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentQuestion?.placeholder}
                  className="chat-input min-h-[120px] resize-none pr-16"
                  rows={4}
                />
              ) : (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={currentQuestion?.type || "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentQuestion?.placeholder}
                  className="chat-input pr-16"
                  autoFocus
                />
              )}
              
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-neon-cyan/20 hover:bg-neon-cyan/30 disabled:opacity-30 disabled:hover:bg-neon-cyan/20 transition-all flex items-center justify-center"
                data-cursor-hover
              >
                <svg
                  className="w-5 h-5 text-neon-cyan"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          )}
        </motion.div>
      )}

      {/* Completion state */}
      {isComplete && !isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={() => {
              setCurrentStep(0);
              setAnswers({});
              setMessages([]);
              setIsComplete(false);
              setTimeout(() => addBotMessage(questions[0].question), 100);
            }}
            className="neon-button"
            data-cursor-hover
          >
            Start Over
          </button>
        </motion.div>
      )}
    </div>
  );
}
