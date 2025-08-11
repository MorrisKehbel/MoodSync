import { useState } from "react";
import { chatBot } from "../../data/chat";
import { useUser } from "../../context";

const Form = ({ messages, setMessages }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleChange = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);

    const userMsg = {
      _id: crypto.randomUUID(),
      role: "user",
      parts: [{ text: prompt }],
    };

    const asstMsg = {
      _id: crypto.randomUUID(),
      role: "assistant",
      parts: [{ text: "" }],
    };

    setMessages((prev) => [...prev, userMsg]);

    const openAIMessages = [...messages, userMsg].map((msg) => ({
      role: msg.role,
      content: msg.parts[0].text,
    }));

    try {
      await chatBot({
        messages: openAIMessages,
        asstMsg,
        setMessages,
      });
    } catch (error) {
      setLoading(false);
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        id="chatInput"
        name="chatInput"
        type="text"
        value={prompt}
        onChange={handleChange}
        placeholder="Type message..."
        className="flex-grow min-w-35 rounded-lg px-4 py-2 bg-gray-100 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />
      <button
        type="submit"
        aria-label="Send message"
        className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg p-2 transition cursor-pointer disabled:opacity-30 disabled:cursor-default"
        disabled={loading || !user.settings.aiTips}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14M12 5l7 7-7 7"
          />
        </svg>
      </button>
    </form>
  );
};

export default Form;
