import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { GraduationCap, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setError("");
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3169a4] via-[#25527f] to-[#3169a4] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#c8a951] blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-[#3169a4]" />
            </div>
            <div className="text-left">
              <div className="text-white text-xl font-bold tracking-wide">BELGIUM CAMPUS</div>
              <div className="text-[#c8a951] text-sm">iTversity</div>
            </div>
          </div>
          <p className="text-white/70 text-sm mt-2">BC CourseFinder™ — Sign in to continue</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-[#3169a4] mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your credentials to access your account</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@belgiumcampus.ac.za"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3169a4] focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3169a4] focus:border-transparent transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3169a4] hover:bg-[#25527f] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-500 text-sm">Don't have an account? </span>
            <Link to="/register" className="text-[#3169a4] text-sm font-semibold hover:underline">
              Register here
            </Link>
          </div>

        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          © 2026 Belgium Campus iTversity. All rights reserved.
        </p>
      </div>
    </div>
  );
}
