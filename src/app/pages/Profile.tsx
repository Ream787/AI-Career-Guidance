import { useState } from "react";
import { User, Mail, Phone, MapPin, BookOpen, Hash, Calendar, Edit3, Save, X, Star, Plus, Trash2, GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const allCareerInterests = [
  "Software Development", "Data Science", "Cloud Computing", "Cybersecurity",
  "AI & Machine Learning", "Mobile Development", "DevOps", "Business Analysis",
  "Network Engineering", "UX/UI Design", "Database Administration", "IT Management",
];

const programs = [
  "BSc Information Technology", "BSc Computer Science", "BSc Business Information Systems",
  "BCom Informatics", "Diploma in IT", "Diploma in Business Analysis",
  "Higher Certificate in IT", "Postgraduate Diploma in IT",
];

const campuses = ["Pretoria", "Johannesburg", "Cape Town", "Online"];

export function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    campus: user?.campus || "",
    program: user?.program || "",
    yearOfStudy: user?.yearOfStudy || 1,
    careerInterests: user?.careerInterests || [],
  });
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      campus: form.campus,
      program: form.program,
      yearOfStudy: Number(form.yearOfStudy),
      careerInterests: form.careerInterests,
    });
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || "",
      campus: user.campus || "",
      program: user.program || "",
      yearOfStudy: user.yearOfStudy || 1,
      careerInterests: user.careerInterests || [],
    });
    setIsEditing(false);
  };

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      careerInterests: prev.careerInterests.includes(interest)
        ? prev.careerInterests.filter((i) => i !== interest)
        : [...prev.careerInterests, interest],
    }));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header card */}
        <div className="bg-gradient-to-r from-[#3169a4] to-[#25527f] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">{user.avatarInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-white text-xl">{user.firstName} {user.lastName}</h1>
                <span className="flex items-center gap-1 bg-white/10 border border-white/20 text-white/80 text-xs px-2 py-0.5 rounded-full">
                  <GraduationCap className="w-3 h-3" /> {user.role === "student" ? "Student" : user.role}
                </span>
              </div>
              <p className="text-white/70 text-sm">{user.email}</p>
              {user.studentNumber && (
                <p className="text-white/60 text-xs mt-1">Student No: {user.studentNumber}</p>
              )}
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>
          </div>

          {saved && (
            <div className="mt-4 bg-green-500/20 border border-green-400/30 text-green-300 text-sm rounded-lg px-4 py-2">
              ✓ Profile updated successfully
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[#3169a4]">Personal Information</h2>
            {isEditing && (
              <div className="flex gap-2">
                <button onClick={handleCancel} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg text-sm transition-colors">
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
                <button onClick={handleSave} className="flex items-center gap-1.5 bg-[#3169a4] hover:bg-[#25527f] text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              icon={<User className="w-4 h-4" />}
              label="First Name"
              value={form.firstName}
              editing={isEditing}
              onChange={(v) => setForm((p) => ({ ...p, firstName: v }))}
            />
            <Field
              icon={<User className="w-4 h-4" />}
              label="Last Name"
              value={form.lastName}
              editing={isEditing}
              onChange={(v) => setForm((p) => ({ ...p, lastName: v }))}
            />
            <Field
              icon={<Mail className="w-4 h-4" />}
              label="Email"
              value={user.email}
              editing={false}
              onChange={() => {}}
              hint="Email cannot be changed"
            />
            <Field
              icon={<Phone className="w-4 h-4" />}
              label="Phone"
              value={form.phone}
              editing={isEditing}
              onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
              placeholder="+27 XX XXX XXXX"
            />
            <Field
              icon={<MapPin className="w-4 h-4" />}
              label="Campus"
              value={form.campus}
              editing={isEditing}
              onChange={(v) => setForm((p) => ({ ...p, campus: v }))}
              type="select"
              options={campuses}
            />
            <Field
              icon={<Calendar className="w-4 h-4" />}
              label="Member Since"
              value={new Date(user.joinedDate).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
              editing={false}
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-[#3169a4] mb-5">Academic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {user.studentNumber && (
                <Field
                  icon={<Hash className="w-4 h-4" />}
                  label="Student Number"
                  value={user.studentNumber}
                  editing={false}
                  onChange={() => {}}
                />
              )}
              <Field
                icon={<BookOpen className="w-4 h-4" />}
                label="Programme"
                value={form.program}
                editing={isEditing}
                onChange={(v) => setForm((p) => ({ ...p, program: v }))}
                type="select"
                options={programs}
              />
              <div>
                <label className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                  <GraduationCap className="w-4 h-4" /> Year of Study
                </label>
                {isEditing ? (
                  <select
                    value={form.yearOfStudy}
                    onChange={(e) => setForm((p) => ({ ...p, yearOfStudy: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3169a4] text-sm"
                  >
                    {[1, 2, 3, 4].map((y) => <option key={y} value={y}>Year {y}</option>)}
                  </select>
                ) : (
                  <p className="text-gray-800 text-sm">Year {form.yearOfStudy}</p>
                )}
              </div>
            </div>
          </div>

        {/* Career Interests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-[#3169a4]" />
              <h2 className="text-[#3169a4]">Career Interests</h2>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              {isEditing ? "Select the IT career areas you're interested in:" : "Your selected career interests"}
            </p>
            <div className="flex flex-wrap gap-2">
              {isEditing ? (
                allCareerInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      form.careerInterests.includes(interest)
                        ? "bg-[#3169a4] text-white border-[#3169a4]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#3169a4]"
                    }`}
                  >
                    {form.careerInterests.includes(interest) ? "✓ " : "+ "}{interest}
                  </button>
                ))
              ) : form.careerInterests.length > 0 ? (
                form.careerInterests.map((interest) => (
                  <span key={interest} className="px-3 py-1.5 bg-[#3169a4]/10 text-[#3169a4] border border-[#3169a4]/20 rounded-full text-sm">
                    {interest}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">No career interests selected yet. Click Edit Profile to add some.</p>
              )}
            </div>
          </div>

      </div>
    </div>
  );
}

interface FieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  hint?: string;
  placeholder?: string;
  type?: "text" | "select";
  options?: string[];
}

function Field({ icon, label, value, editing, onChange, hint, placeholder, type = "text", options }: FieldProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
        {icon} {label}
      </label>
      {editing ? (
        type === "select" && options ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3169a4] text-sm bg-white"
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3169a4] text-sm"
          />
        )
      ) : (
        <div>
          <p className="text-gray-800 text-sm">{value || <span className="text-gray-400 italic">Not set</span>}</p>
          {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
        </div>
      )}
    </div>
  );
}
