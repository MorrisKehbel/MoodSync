import { addOrUpdateMsg } from "../utils/msgUtils";

const API_URL = import.meta.env.VITE_API_URL;
const baseURL = `${API_URL}/ai`;

export const chatBot = async ({ messages, asstMsg, setMessages }) => {
  try {
    const res = await fetch(`${baseURL}/chat`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Unknown error");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((line) => line.trim() !== "");

      for (const line of lines) {
        if (line === "data: [DONE]") return;

        if (line.startsWith("data: ")) {
          const { text } = JSON.parse(line.replace("data: ", ""));
          setMessages((prev) => addOrUpdateMsg(prev, asstMsg, text));
        }
      }
    }
  } catch (error) {
    console.error("Streaming error:", error);
    throw error;
  }
};
