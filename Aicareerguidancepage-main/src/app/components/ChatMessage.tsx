import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
}

export function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-[#1e3a5f]' : 'bg-gray-300'
      }`}>
        {isBot ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div className={`flex-1 flex ${isBot ? 'justify-start' : 'justify-end'}`}>
        <div className={`inline-block max-w-[55%] w-fit px-4 py-3 rounded-lg ${
          isBot ? 'bg-gray-100 text-gray-800' : 'bg-[#1e3a5f] text-white'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message}</p>
          {timestamp && (
            <p className="text-xs mt-1 opacity-60">{timestamp}</p>
          )}
        </div>
      </div>
    </div>
  );
}
