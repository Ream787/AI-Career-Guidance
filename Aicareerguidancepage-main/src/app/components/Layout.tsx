import { Outlet } from "react-router";
import { ChatHeader } from "./ChatHeader";

export function Layout() {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <ChatHeader />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
