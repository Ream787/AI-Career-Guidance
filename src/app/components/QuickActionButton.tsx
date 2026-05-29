import { ChevronRight } from "lucide-react";

interface QuickActionButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export function QuickActionButton({ label, onClick, icon }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#1e3a5f] hover:bg-[#2a4a7f] text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors group"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
