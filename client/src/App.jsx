import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Bot, ArrowLeft, Mic } from "lucide-react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const CHAT_API_URL = "http://localhost:5000/api/chat";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hey there! 👋 I'm StudyBuddy AI—your smart study companion. How can I help you today? 📚✨",
      sender: "bot",
    },
  ]);
  useEffect(() => {
    Toastify({
      text: "⚠️ Use Chrome for the best experience!",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "blue",
      stopOnFocus: true,
    }).showToast();
  }, []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const chatEndRef = useRef(null);

  

  
  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(CHAT_API_URL, { message: text });
      setMessages((prev) => [
        ...prev,
        { text: response.data.reply || "StudyBuddy is confused...", sender: "bot" },
      ]);
    } catch (error) {
      console.error("🔥 Chatbot error:", error.response?.data || error.message);
      setMessages((prev) => [...prev, { text: "Error connecting to StudyBuddy", sender: "bot" }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startVoiceRecognition = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setRecording(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };
    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setMessages((prev) => [...prev, { text: "Could not understand speech", sender: "bot" }]);
    };
    recognition.onend = () => setRecording(false);

    recognition.start();
  };

  return (
    <div className="max-w-xl mx-auto mt-5 bg-white shadow-lg rounded-lg flex flex-col border border-gray-900 overflow-hidden max-h-screen">
      <div className="bg-blue-700 text-white text-lg font-bold p-4 flex items-center shadow-md">
        <button onClick={() => window.history.back()} className="mr-3">
          <ArrowLeft size={24} />
        </button>
        <Bot className="mr-2" /> StudyBuddy AI
      </div>

      <div className="p-5 h-115 overflow-y-auto flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-lg max-w-xs ${msg.sender === "user" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-300 text-black"}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="mr-auto bg-gray-300 text-black p-2 my-1 rounded-lg max-w-xs">
            Typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t flex">
        <button
          onClick={startVoiceRecognition}
          className={`p-2 ${recording ? "bg-gray-400" : "bg-green-600"} text-white rounded-l-md`}
          disabled={recording}
        >
          <Mic size={20} />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow p-2 border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          disabled={loading}
        />
        <button
          className={`px-4 py-2 rounded-r-md ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          onClick={() => sendMessage(input)}
          disabled={loading}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
