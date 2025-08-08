import { useEffect } from "react";
import ChatBubble from "./ChatBubble";

const Chat = ({ messages, chatRef }) => {
  useEffect(() => {
    const el = chatRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={chatRef} className="h-full overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col justify-end min-h-full px-4 py-1 space-y-2">
        {messages.map((msg) => (
          <ChatBubble key={msg._id} message={msg} />
        ))}
      </div>
    </div>
  );
};
export default Chat;
