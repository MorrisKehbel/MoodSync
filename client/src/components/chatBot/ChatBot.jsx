import { useState, useRef } from "react";
import { useUser } from "../../context";
import Chat from "./Chat";
import Form from "./Form";

import { FaExpandArrowsAlt, FaCompressArrowsAlt } from "react-icons/fa";

export const ChatBot = ({ chatbotExpanded, setChatbotExpanded }) => {
  const { user } = useUser();

  const [messages, setMessages] = useState(() => [
    {
      _id: crypto.randomUUID(),
      role: "assistant",
      parts: [
        {
          text: `${
            user.settings.aiTips
              ? "How can i help you?"
              : "I have been deactivated."
          }`,
        },
      ],
    },
  ]);
  const [chatId, setChatId] = useState(
    () => localStorage.getItem("chatId") || null
  );
  const chatRef = useRef(null);

  return (
    <div className="bg-white rounded-lg p-3 shadow-md h-full min-h-64 flex flex-col justify-between">
      <button
        aria-label="Adjust the chat size"
        onClick={() => setChatbotExpanded((prev) => !prev)}
        className="text-gray-700 hover:text-black p-2 self-end transition hover:scale-105 cursor-pointer"
      >
        {chatbotExpanded ? (
          <FaCompressArrowsAlt size="14" />
        ) : (
          <FaExpandArrowsAlt size="14" />
        )}
      </button>
      <Chat messages={messages} chatRef={chatRef} />
      <Form
        messages={messages}
        setMessages={setMessages}
        chatId={chatId}
        setChatId={setChatId}
      />
    </div>
  );
};
