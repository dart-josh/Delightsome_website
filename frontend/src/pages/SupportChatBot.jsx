import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Bot } from "lucide-react";
import { useChatStore } from "../hooks/useChatStore";
import { sendToGPT } from "../utils/chatAPI";

export default function SupportChatBot() {
  const { isOpen, setIsOpen, messages, addMessage, clearChat } = useChatStore();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input.trim() };
    addMessage(userMsg);
    setInput("");
    setTyping(true);

    const botReply = await sendToGPT(input.trim());
    addMessage({ sender: "bot", text: botReply });
    setTyping(false);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg hover:bg-orange-700"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 max-h-[450px] flex w-80 max-w-full flex-col rounded-lg  bg-white shadow-2xl">
          <div className="flex justify-between bg-green-600 p-4 font-semibold text-white">
            💬 Support Chat
            <button onClick={clearChat} className="text-sm underline">
              Clear
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4 text-sm">
            {!messages ||
              (messages.length == 0 && (
                <div className="max-w-xs self-start rounded-md border border-gray-200 bg-white p-2 shadow">
                  Hi there! 👋
                  <br />
                  How can we help you today?
                </div>
              ))}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[80%] items-start gap-2`}>
                  {msg.sender === "bot" && (
                    <Bot className="mt-1 text-orange-500" size={18} />
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 shadow ${
                      msg.sender === "user"
                        ? "bg-orange-600 text-white"
                        : "border bg-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="animate-pulse text-xs text-gray-400">
                Typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="flex gap-2 border-t p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded border px-3 py-2 text-sm ring-orange-400 focus:outline-none focus:ring-2"
            />
            <button
              onClick={handleSend}
              className="rounded bg-orange-600 px-3 py-2 text-sm text-white hover:bg-orange-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
