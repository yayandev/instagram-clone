"use client";
import { ModalCommentsProvider } from "@/context/ModalCommentsContext";
import { ModalAddPostProvider } from "@/context/ModalCreatePostContext";
import { ModalPostOptionsProvider } from "@/context/ModalPostOptionsContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalAddPostProvider>
      <ModalPostOptionsProvider>
        <ModalCommentsProvider>{children}</ModalCommentsProvider>
      </ModalPostOptionsProvider>
    </ModalAddPostProvider>
  );
};

export default Providers;
