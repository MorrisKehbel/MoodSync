import { useState, useRef, useEffect } from "react";
import Chat from "./Chat";
import Form from "./Form";

export const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(
    () => localStorage.getItem("chatId") || null
  );
  const chatRef = useRef(null);

  return (
    <div className="bg-white rounded-lg p-3 shadow-md h-64 flex flex-col justify-between gap-3">
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
