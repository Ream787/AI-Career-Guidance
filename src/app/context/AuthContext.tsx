import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../../lib/supabase";

export type UserRole = "student" | "admin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  studentNumber?: string;
  program?: string;
  yearOfStudy?: number;
  careerInterests?: string[];
  phone?: string;
  campus?: string;
  joinedDate: string;
  avatarInitials: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  studentNumber?: string;
  program?: string;
  phone?: string;
  campus?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "bc_coursefinder_user";

const mapUser = (row: any): User => ({
  id: row.id,
  firstName: row.first_name,
  lastName: row.last_name,
  email: row.email,
  role: row.role || "student",
  studentNumber: row.student_number || "",
  program: row.program || "",
  yearOfStudy: row.year_of_study || 1,
  careerInterests: row.career_interests || [],
  phone: row.phone || "",
  campus: row.campus || "",
  joinedDate: row.created_at ? new Date(row.created_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
  avatarInitials: `${row.first_name?.[0] || ""}${row.last_name?.[0] || ""}`.toUpperCase(),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (authError || !authData?.user) {
      return { success: false, error: "Invalid email or password. Please try again." };
    }

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (profileError || !profile) {
      console.error("Profile load error:", profileError);
      return { success: false, error: "Unable to load your account profile. Please contact support." };
    }

    setUser(mapUser(profile));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = data.email.trim().toLowerCase();
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (signUpError) {
      console.error("Registration auth error:", signUpError);
      return { success: false, error: signUpError.message || "Failed to create account. Please try again." };
    }

    if (!signUpData?.user) {
      // Supabase may require email confirmation before the user becomes active.
      return {
        success: false,
        error: "Registration succeeded, but email confirmation is required before you can sign in. Please check your inbox.",
      };
    }

    const profilePayload: Record<string, any> = {
      id: signUpData.user.id,
      email: normalizedEmail,
      first_name: data.firstName,
      last_name: data.lastName,
      role: "student",
      created_at: new Date().toISOString(),
    };

    if (data.studentNumber) profilePayload.student_number = data.studentNumber;
    if (data.program) profilePayload.program = data.program;
    if (data.phone) profilePayload.phone = data.phone;
    if (data.campus) profilePayload.campus = data.campus;

    const { data: createdUser, error: profileError } = await supabase
      .from("users")
      .insert([profilePayload])
      .select("*")
      .single();

    if (profileError || !createdUser) {
      console.error("Registration profile error:", profileError);
      return { success: false, error: profileError?.message || "Failed to create account profile. Please contact support." };
    }

    const newUser = mapUser(createdUser);
    setUser(newUser);
    return { success: true };
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;

    const updates: any = {
      first_name: data.firstName ?? user.firstName,
      last_name: data.lastName ?? user.lastName,
      phone: data.phone ?? user.phone,
      campus: data.campus ?? user.campus,
      program: data.program ?? user.program,
      year_of_study: data.yearOfStudy ?? user.yearOfStudy,
      career_interests: data.careerInterests ?? user.careerInterests,
    };

    const { data: updatedUser, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", user.id)
      .select("*")
      .single();

    if (error || !updatedUser) {
      console.error("Profile update error:", error);
      return;
    }

    setUser(mapUser(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
