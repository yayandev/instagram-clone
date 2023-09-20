"use client";
import { createContext, useContext, useState } from "react";

export const ModalPostOptionsContext = createContext({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {
    isOpen: isOpen;
  },
});

export const useModalPostOptions = () => {
  return useContext(ModalPostOptionsContext);
};

export const ModalPostOptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen]: any = useState();
  return (
    <ModalPostOptionsContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ModalPostOptionsContext.Provider>
  );
};
