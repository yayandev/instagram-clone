"use client";
import { useAuth } from "@/context/AuthContext";

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const { status } = useAuth();

  if (status === "authenticated") return <>{children}</>;
  return null;
};

export default ClientOnly;
