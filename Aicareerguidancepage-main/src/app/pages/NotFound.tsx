import { Link } from "react-router";
import { AlertCircle } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <AlertCircle className="w-16 h-16 text-[#1e3a5f] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4">404 - Page Not Found</h1>
        <p className="text-gray-700 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className="bg-[#1e3a5f] hover:bg-[#2a4a7f] text-white px-6 py-3 rounded-lg inline-block transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
