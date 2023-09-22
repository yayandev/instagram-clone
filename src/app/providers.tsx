"use client";
import { ModalCommentsProvider } from "@/context/ModalCommentsContext";
import { ModalAddPostProvider } from "@/context/ModalCreatePostContext";
import { ModalPostOptionsProvider } from "@/context/ModalPostOptionsContext";
import { ModalSettingsProvider } from "@/context/ModalSettingsContext";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ModalSettingsProvider>
        <ModalAddPostProvider>
          <ModalPostOptionsProvider>
            <ModalCommentsProvider>{children}</ModalCommentsProvider>
          </ModalPostOptionsProvider>
        </ModalAddPostProvider>
      </ModalSettingsProvider>
    </SessionProvider>
  );
};

export default Providers;
