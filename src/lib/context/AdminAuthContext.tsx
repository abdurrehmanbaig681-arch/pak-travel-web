"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "staff";
}

interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchRole: (role: "admin" | "staff") => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
  switchRole: () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent mock/admin session first
    const saved = localStorage.getItem("pt_admin_session");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const adminData: AdminUser = {
          uid: fbUser.uid,
          email: fbUser.email || "admin@paktravel.com.pk",
          displayName: fbUser.displayName || "Pak Travel Administrator",
          role: fbUser.email?.includes("staff") ? "staff" : "admin",
        };
        setUser(adminData);
        localStorage.setItem("pt_admin_session", JSON.stringify(adminData));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const role = email.includes("staff") ? "staff" : "admin";
      const u: AdminUser = {
        uid: cred.user.uid,
        email: cred.user.email || email,
        displayName: cred.user.displayName || (role === "admin" ? "Mian Mohsin Ali (Admin)" : "Staff Coordinator"),
        role,
      };
      setUser(u);
      localStorage.setItem("pt_admin_session", JSON.stringify(u));
      return { success: true };
    } catch (err: any) {
      // If Firebase Auth user hasn't been created yet in the new Firebase console,
      // provide seamless fallback for default admin/staff credentials
      if (
        (email === "admin@paktravel.com.pk" && pass === "Admin@12345") ||
        (email === "staff@paktravel.com.pk" && pass === "Staff@12345")
      ) {
        const role = email.includes("staff") ? "staff" : "admin";
        const fallbackUser: AdminUser = {
          uid: `local-${role}-${Date.now()}`,
          email,
          displayName: role === "admin" ? "Mian Mohsin Ali (Admin)" : "Staff Coordinator",
          role,
        };
        setUser(fallbackUser);
        localStorage.setItem("pt_admin_session", JSON.stringify(fallbackUser));
        return { success: true };
      }
      return { success: false, error: err?.message || "Invalid credentials" };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setUser(null);
    localStorage.removeItem("pt_admin_session");
  };

  const switchRole = (role: "admin" | "staff") => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      localStorage.setItem("pt_admin_session", JSON.stringify(updated));
    }
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout, switchRole }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
