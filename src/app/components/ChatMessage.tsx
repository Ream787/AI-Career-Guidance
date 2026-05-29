import { Bot } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
}

export function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  const { user } = useAuth();

  return (
    <div className={`flex items-end gap-3 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#3169a4]">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
        <div className={`inline-block max-w-[70%] px-4 py-3 rounded-lg ${
          isBot ? 'bg-gray-100 text-gray-800' : 'bg-[#3169a4] text-white'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message}</p>
        </div>
        {timestamp && (
          <p className="text-xs mt-1 opacity-60">{timestamp}</p>
        )}
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#3169a4]">
          <span className="text-xs font-semibold text-white">{user?.avatarInitials ?? "U"}</span>
        </div>
      )}
    </div>
  );
}
