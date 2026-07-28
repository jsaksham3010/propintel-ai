"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/login");
          return;
        }

        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.success && mounted) {
          setLoading(false);
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        console.error("Authentication Error:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.replace("/login");
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-gray-600 font-medium">
            Verifying your session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}