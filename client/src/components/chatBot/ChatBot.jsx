import { useState, useRef, useEffect } from "react";
import Chat from "./Chat";
import Form from "./Form";

export const ChatBot = () => {
  const [messages, setMessages] = useState(() => [
    {
      _id: crypto.randomUUID(),
      role: "assistant",
      parts: [{ text: "How can i help you?" }],
    },
  ]);
  const [chatId, setChatId] = useState(
    () => localStorage.getItem("chatId") || null
  );
  const chatRef = useRef(null);

  return (
    <div className="bg-white rounded-lg p-3 shadow-md h-64 flex flex-col justify-between">
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
