"use client";
import { createContext, useContext, useState } from "react";

export const ModalSettingsContext = createContext({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {
    isOpen: isOpen;
  },
});

export const useModalSettings = () => {
  return useContext(ModalSettingsContext);
};

export const ModalSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen]: any = useState();
  return (
    <ModalSettingsContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ModalSettingsContext.Provider>
  );
};
