"use client";
import { useAuth } from "@/context/AuthContext";

const PublicOnly = ({ children }: { children: React.ReactNode }) => {
  const { status } = useAuth();

  if (status === "unauthenticated") return <>{children}</>;
  return null;
};

export default PublicOnly;
