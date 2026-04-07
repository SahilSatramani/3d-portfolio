import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot, Send } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

const WORD_DELAY_MS = 40;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I'm Atlas — Sahil Satramani's AI assistant. Ask me anything about his work, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<boolean>(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const revealWordByWord = async (
    messageId: string,
    fullText: string
  ): Promise<void> => {
    const words = fullText.split(" ");
    let revealed = "";
    for (let i = 0; i < words.length; i++) {
      if (abortRef.current) break;
      revealed += (i === 0 ? "" : " ") + words[i];
      const current = revealed;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId
            ? { ...m, content: current, isTyping: false }
            : m
        )
      );
      await new Promise((r) => setTimeout(r, WORD_DELAY_MS));
    }
  };

  const sendMessage = async (): Promise<void> => {
    const question = input.trim();
    if (!question || isStreaming) return;
    if (question.length > 500) return;

    abortRef.current = false;
    setInput("");
    setIsStreaming(true);

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
    };

    const assistantMsgId = `assistant-${Date.now()}`;
    const typingMsg: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      isTyping: true,
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json() as { answer: string };
      await revealWordByWord(assistantMsgId, data.answer);
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content:
                  "Something went wrong. Please try again or email sahilsatramani5@gmail.com",
                isTyping: false,
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = (): void => {
    abortRef.current = true;
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        style={{
          position: "fixed",
          bottom: "80px",
          right: "32px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #22d3ee, #0891b2)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen
            ? "0 0 30px rgba(34, 211, 238, 0.6)"
            : [
                "0 0 20px rgba(34, 211, 238, 0.4)",
                "0 0 35px rgba(34, 211, 238, 0.7)",
                "0 0 20px rgba(34, 211, 238, 0.4)",
              ],
        }}
        transition={{ duration: 2, repeat: isOpen ? 0 : Infinity }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} color="white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: "148px",
              right: "32px",
              width: "360px",
              height: "500px",
              background: "rgba(2, 9, 23, 0.95)",
              border: "1px solid rgba(34, 211, 238, 0.2)",
              borderRadius: "16px",
              backdropFilter: "blur(20px)",
              zIndex: 99998,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(34, 211, 238, 0.1)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #22d3ee, #0891b2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <Bot size={18} color="white" />
              </div>
              <div>
                <div style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                }}>
                  Atlas
                </div>
                <div style={{
                  color: "rgba(34, 211, 238, 0.8)",
                  fontSize: "11px",
                  letterSpacing: "0.5px",
                }}>
                  Sahil's AI Assistant · Powered by RAG + Claude
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.role === "user" ? "flex-end" : "flex-start",
                    gap: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  {msg.role === "assistant" && (
                    <div style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #22d3ee, #0891b2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}>
                      <Bot size={14} color="white" />
                    </div>
                  )}
                  <div style={{
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #22d3ee, #0891b2)"
                        : "rgba(255,255,255,0.05)",
                    border:
                      msg.role === "user"
                        ? "none"
                        : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    borderTopLeftRadius: msg.role === "assistant" ? "4px" : "12px",
                    borderTopRightRadius: msg.role === "user" ? "4px" : "12px",
                    padding: "10px 14px",
                    color:
                      msg.role === "user"
                        ? "white"
                        : "rgba(255,255,255,0.85)",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    maxWidth: "260px",
                    wordBreak: "break-word",
                  }}>
                    {msg.isTyping ? (
                      <div style={{ display: "flex", gap: "4px", padding: "4px 0" }}>
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.5)",
                            }}
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(34, 211, 238, 0.1)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Sahil..."
                maxLength={500}
                disabled={isStreaming}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "white",
                  fontSize: "13px",
                  outline: "none",
                  fontFamily: "inherit",
                  opacity: isStreaming ? 0.6 : 1,
                }}
              />
              <motion.button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming}
                whileHover={{ scale: input.trim() && !isStreaming ? 1.05 : 1 }}
                whileTap={{ scale: input.trim() && !isStreaming ? 0.95 : 1 }}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background:
                    input.trim() && !isStreaming
                      ? "linear-gradient(135deg, #22d3ee, #0891b2)"
                      : "rgba(255,255,255,0.1)",
                  border: "none",
                  cursor: input.trim() && !isStreaming ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                <Send size={16} color="white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
