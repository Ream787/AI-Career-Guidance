import { useMemo, type MouseEvent } from "react";
import { MessageSquare, Plus, Trash2, PanelLeftClose } from "lucide-react";

export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  date: string;
  messages: Message[];
}

interface ChatHistoryProps {
  sessions: ChatSession[];
  activeSessionId: string;
  sidebarOpen: boolean;
  onSelectSession: (session: ChatSession) => void;
  onDeleteSession: (e: MouseEvent, sessionId: string) => void;
  onNewChat: () => void;
  onCloseSidebar: () => void;
}

export function ChatHistory({
  sessions,
  activeSessionId,
  sidebarOpen,
  onSelectSession,
  onDeleteSession,
  onNewChat,
  onCloseSidebar,
}: ChatHistoryProps) {
  const groupedSessions = useMemo(
    () =>
      sessions.reduce<Record<string, ChatSession[]>>((acc, session) => {
        acc[session.date] = [...(acc[session.date] || []), session];
        return acc;
      }, {}),
    [sessions]
  );

  return (
    <div
      className={`flex flex-col bg-[#111827] text-white transition-all duration-300 flex-shrink-0 ${
        sidebarOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <div className="flex items-center justify-between px-3 py-4 border-b border-gray-700">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Chat history</p>
          <p className="text-sm font-semibold text-gray-100 truncate">BC CourseFinder™</p>
        </div>
        <button
          onClick={onCloseSidebar}
          className="p-1.5 rounded-md hover:bg-gray-700 transition-colors flex-shrink-0"
        >
          <PanelLeftClose className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="px-3 pt-3 pb-2">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 text-sm text-gray-300 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4">
        {Object.entries(groupedSessions).map(([date, group]) => (
          <div key={date}>
            <p className="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider">{date}</p>
            {group.map((session) => (
              <div
                key={session.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectSession(session)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectSession(session);
                  }
                }}
                className={`w-full text-left group flex flex-col gap-1 px-3 py-3 rounded-xl text-sm transition-colors ${
                  activeSessionId === session.id
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium truncate">{session.title}</span>
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-2">{session.preview}</p>
                <div className="flex items-center justify-between text-[10px] text-gray-500">
                  <span>{session.messages.length} messages</span>
                  <button
                    onClick={(e) => onDeleteSession(e, session.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-600 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}

        {sessions.length === 0 && (
          <p className="px-2 text-xs text-gray-500 italic">No history yet. Start a conversation to save your chats.</p>
        )}
      </div>
    </div>
  );
}
