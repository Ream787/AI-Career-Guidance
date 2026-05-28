import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GraduationCap, Eye, EyeOff, UserPlus, AlertCircle } from "lucide-react";
import { useAuth, RegisterData } from "../context/AuthContext";

const programs = [
  "BSc Information Technology",
  "BSc Computer Science",
  "BSc Business Information Systems",
  "BCom Informatics",
  "Diploma in IT",
  "Diploma in Business Analysis",
  "Higher Certificate in IT",
  "Postgraduate Diploma in IT",
];

const campuses = ["Pretoria", "Johannesburg", "Cape Town", "Online"];

export function Register() {
  const [formData, setFormData] = useState<RegisterData & { confirmPassword: string }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentNumber: "",
    program: "",
    phone: "",
    campus: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) { setError("Please enter your full name."); return; }
    if (!formData.email || !formData.email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (!formData.password || formData.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (formData.password !== formData.confirmPassword) { setError("Passwords do not match."); return; }
    setIsLoading(true);
    setError("");
    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      studentNumber: formData.studentNumber,
      program: formData.program,
      phone: formData.phone,
      campus: formData.campus,
    });
    setIsLoading(false);
    if (result.success) {
      navigate("/", { replace: true });
    } else {
      setError(result.error || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2a4a7f] to-[#1e3a5f] flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#c8a951] blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-[#1e3a5f]" />
            </div>
            <div className="text-left">
              <div className="text-white text-xl font-bold tracking-wide">BELGIUM CAMPUS</div>
              <div className="text-[#c8a951] text-sm">iTversity</div>
            </div>
          </div>
          <p className="text-white/70 text-sm mt-2">Create your BC CourseFinder™ account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-[#1e3a5f] mb-1">Create your account</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your details to get started</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">First name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="First name"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Last name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Last name"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@belgiumcampus.ac.za"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] text-sm pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Confirm password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] text-sm pr-10"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1e3a5f] hover:bg-[#2a4a7f] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <span className="text-gray-500 text-sm">Already have an account? </span>
            <Link to="/login" className="text-[#1e3a5f] text-sm font-semibold hover:underline">
              Sign in
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