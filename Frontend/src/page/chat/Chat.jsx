import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Chat.css";

const Chat = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem("chatMessages");

      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch (error) {
      console.error("Failed to load chat history:", error);
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    const question = input.trim();

    if (!question || loading) return;

    const updatedMessages = [...messages, { role: "user", content: question }];

    setMessages(updatedMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(err.message || "Failed to connect to the AI.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (messages.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete the entire chat?",
    );

    if (!confirmed) return;

    setMessages([]);
    setError("");
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        <h1>AI Learning Assistant</h1>
        <p>Ask questions, explore concepts, and learn something new.</p>
        <button
          type="button"
          className="clear-chat-btn"
          onClick={handleClearChat}
          disabled={messages.length === 0 || loading}
        >
          Clear Chat
        </button>
      </header>

      <main className="chat-container">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <h2>What would you like to learn today?</h2>
            <p>
              Ask me about JavaScript, React, web development, or your learning
              roadmap.
            </p>
          </div>
        )}

        <div className="chat-messages" aria-live="polite">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              <strong>
                {message.role === "user" ? "You" : "AI Assistant"}
              </strong>

              <div className="message-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-message assistant">
              <strong>AI Assistant</strong>
              <p>Thinking...</p>
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="chat-error">
            {error}
          </p>
        )}

        <form className="chat-input-form" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            aria-label="Ask your question"
            disabled={loading}
          />

          <button type="submit">{loading ? "Sending..." : "Send"}</button>
        </form>
      </main>
    </div>
  );
};

export default Chat;
