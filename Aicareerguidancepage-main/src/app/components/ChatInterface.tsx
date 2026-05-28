import { useState, useRef, useEffect, type MouseEvent } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatHistory } from "./ChatHistory";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../../lib/supabase";
import {
  Send,
  Calculator,
  Code,
  GraduationCap,
  Briefcase,
  Lightbulb,
  BookOpen,
  PanelLeftOpen,
  Plus,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  date: string;
  messages: Message[];
}

const suggestedTopics = [
  { label: "Careers with Maths & Science", icon: <Calculator className="w-4 h-4" /> },
  { label: "Skills for Software Development", icon: <Code className="w-4 h-4" /> },
  { label: "Diploma vs. Degree", icon: <GraduationCap className="w-4 h-4" /> },
  { label: "Internship Options", icon: <Briefcase className="w-4 h-4" /> },
  { label: "IT Career Paths", icon: <Lightbulb className="w-4 h-4" /> },
  { label: "Understanding Qualifications", icon: <BookOpen className="w-4 h-4" /> },
];

const welcomeMessage: Message = {
  id: 1,
  text: "Hello! I'm your BC CourseFinder™ assistant. How can I assist you with planning your IT studies at Belgium Campus?\n\nI can help you with:\n• Exploring IT career paths\n• Understanding qualifications\n• Finding internships and learnerships\n• Comparing diploma and degree options",
  isBot: true,
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

const formatConversationDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    return "Today";
  }

  if (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  ) {
    return "Yesterday";
  }

  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const buildChatMessage = (message: any, index: number): Message => ({
  id: index + 1,
  text: message.content || "",
  isBot: message.role !== "user",
  timestamp: message.created_at
    ? new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
});

export function ChatInterface() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string>("new");
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadHistory = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("conversations")
      .select("id,title,created_at,messages(id,role,content,created_at)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading conversation history:", error);
      return;
    }

    if (!data) return;

    const chatSessions = data.map((session: any) => {
      const sortedMessages = (session.messages || []).sort(
        (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      const previewMessage = sortedMessages.find((m: any) => m.role === "user")?.content || session.title || "New conversation";

      return {
        id: session.id,
        title: session.title || previewMessage.slice(0, 40),
        preview: previewMessage,
        date: formatConversationDate(session.created_at),
        messages: sortedMessages.map(buildChatMessage),
      };
    });

    setSessions(chatSessions);
  };

  useEffect(() => {
    loadHistory();
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buildConversationPrompt = (chatMessages: Message[]) => {
    const filteredMessages = chatMessages.filter((message, index) => {
      return !(
        index === 0 &&
        message.isBot &&
        message.text === welcomeMessage.text
      );
    });

    return filteredMessages
      .map((message) => `${message.isBot ? "Assistant" : "Student"}: ${message.text}`)
      .join("\n");
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const conversation = buildConversationPrompt(messages);
      const body: Record<string, string> = { message: userMessage };

      if (conversation.trim()) {
        body.conversation = conversation;
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling backend:", error);
      return "⚠️ I'm having trouble connecting to my AI service. Please make sure:\n\n1. The backend server is running (npm start in the /server folder)\n2. Your Gemini API key is configured in the .env file\n\nIn the meantime, I can still help! Try asking about:\n• IT career paths\n• Diploma vs Degree options\n• Internship opportunities\n• Course information";
    }
  };

  const createConversation = async (firstMessage: string) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from("conversations")
      .insert([
        {
          title: firstMessage.slice(0, 40),
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    setConversationId(data.id);

    return data.id;
  };



  const handleSendMessage = async (overrideMessage?: string) => {
    const messageText = overrideMessage || inputValue;
    if (messageText.trim() === "") return;

    const userMsg: Message = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    let currentConversationId = conversationId;
    setMessages((prev) => [...prev, userMsg]);

    if (activeSessionId === "new" && !currentConversationId) {
      currentConversationId = await createConversation(messageText);
      if (!currentConversationId) {
        console.error("Failed to create conversation");
        return;
      }
    }

    const { error: insertError } = await supabase.from("messages").insert([
      {
        conversation_id: currentConversationId,
        role: "user",
        content: messageText,
      },
    ]);

    if (insertError) {
      console.error("Error saving user message:", insertError);
    }

    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(messageText);
      const botMsg: Message = {
        id: messages.length + 2,
        text: aiResponse,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const { error: assistantError } = await supabase.from("messages").insert([
        {
          conversation_id: currentConversationId,
          role: "assistant",
          content: aiResponse,
        },
      ]);

      if (assistantError) {
        console.error("Error saving assistant message:", assistantError);
      }

      setMessages((prev) => [...prev, botMsg]);

      if (currentConversationId) {
        setSessions((prev) => {
          const existingSession = prev.find((session) => session.id === currentConversationId);
          const updatedSession = {
            id: currentConversationId,
            title: existingSession?.title || messageText.slice(0, 40),
            preview: messageText,
            date: existingSession?.date || formatConversationDate(new Date().toISOString()),
            messages: existingSession
              ? [...existingSession.messages, userMsg, botMsg]
              : [userMsg, botMsg],
          };

          if (existingSession) {
            return prev.map((session) =>
              session.id === currentConversationId ? updatedSession : session
            );
          }

          return [updatedSession, ...prev];
        });
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
      if (currentConversationId) setConversationId(currentConversationId);
    }
  };

  const handleNewChat = () => {
    setActiveSessionId("new");
    setConversationId(null);
    setMessages([
      {
        ...welcomeMessage,
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInputValue("");
  };

  const handleSelectSession = (session: ChatSession) => {
    setActiveSessionId(session.id);
    setConversationId(session.id);
    setMessages(
      session.messages.length > 0
        ? session.messages
        : [
            {
              ...welcomeMessage,
              id: Date.now(),
              text: `You previously asked: "${session.preview}"\n\nStart a new message to continue this conversation.`,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]
    );
  };

  const handleDeleteSession = async (e: MouseEvent, sessionId: string) => {
    e.stopPropagation();

    const { error: messageError } = await supabase
      .from("messages")
      .delete()
      .eq("conversation_id", sessionId);

    if (messageError) {
      console.error("Error deleting conversation messages:", messageError);
    }

    const { error: conversationError } = await supabase
      .from("conversations")
      .delete()
      .eq("id", sessionId);

    if (conversationError) {
      console.error("Error deleting conversation:", conversationError);
    }

    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (activeSessionId === sessionId) handleNewChat();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isNewChat = activeSessionId === "new" && messages.length <= 1;

  return (
    <div className="flex-1 flex overflow-hidden min-h-0 bg-gray-50">
      <ChatHistory
        sessions={sessions}
        activeSessionId={activeSessionId}
        sidebarOpen={sidebarOpen}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onNewChat={handleNewChat}
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              <PanelLeftOpen className="w-5 h-5 text-gray-500" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1e3a5f] flex items-center justify-center">
              <span className="text-white text-xs font-bold">BC</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">BC CourseFinder™</span>
          </div>
          <div className="ml-auto">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <Plus className="w-4 h-4" />
              New chat
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto w-full max-w-3xl space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">BC</span>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm max-w-[55%]">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Topics — shown only on new chat */}
        {isNewChat && (
          <div className="px-4 pb-3">
            <p className="text-xs text-gray-500 mb-2 text-center">Suggested topics</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(topic.label)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-300 bg-white hover:bg-[#1e3a5f] hover:text-white hover:border-[#1e3a5f] text-gray-700 text-sm transition-colors shadow-sm"
                >
                  {topic.icon}
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-4 py-4 flex-shrink-0">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message BC CourseFinder™..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent text-sm bg-gray-50"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={inputValue.trim() === "" || isLoading}
              className="bg-[#1e3a5f] hover:bg-[#2a4a7f] disabled:bg-gray-200 disabled:cursor-not-allowed text-white w-11 h-11 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
