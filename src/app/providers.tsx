"use client";
import { ModalCommentsProvider } from "@/context/ModalCommentsContext";
import { ModalAddPostProvider } from "@/context/ModalCreatePostContext";
import { ModalPostOptionsProvider } from "@/context/ModalPostOptionsContext";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ModalAddPostProvider>
        <ModalPostOptionsProvider>
          <ModalCommentsProvider>{children}</ModalCommentsProvider>
        </ModalPostOptionsProvider>
      </ModalAddPostProvider>
    </SessionProvider>
  );
};

export default Providers;
