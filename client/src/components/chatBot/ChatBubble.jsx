import { useUser } from "../../context";

const ChatBubble = ({ message }) => {
  const { role, parts } = message;
  const { user } = useUser();
  const isUser = role === "user";

  return (
    <div
      className={`flex items-end ${
        isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {!isUser && (
        <div className="mr-2 flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm select-none">
          Ai
        </div>
      )}
      <div
        className={`px-4 py-2 max-w-sm min-w-0 overflow-hidden whitespace-pre-wrap rounded-lg text-sm ${
          isUser
            ? "bg-gray-100 text-gray-900 rounded-br-none"
            : "bg-blue-600 text-white rounded-bl-none"
        }`}
      >
        <div className="whitespace-pre-wrap  break-words">{parts[0].text}</div>
      </div>
      {isUser && (
        <div className="ml-2 self-end flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm select-none">
          {user.profilePicture ? (
            <img
              src={user.profilePicture.url}
              alt="Your Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            "Me"
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
