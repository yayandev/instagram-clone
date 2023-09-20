"use client";
import { createContext, useContext, useState } from "react";

export const ModalCommentsContext = createContext({
  isOpenModalComments: false,
  setIsOpenModalComments: (isOpenModalComments: boolean) => {
    isOpenModalComments: isOpenModalComments;
  },
});

export const useModalComments = () => {
  return useContext(ModalCommentsContext);
};

export const ModalCommentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpenModalComments, setIsOpenModalComments]: any = useState();
  return (
    <ModalCommentsContext.Provider
      value={{
        isOpenModalComments,
        setIsOpenModalComments,
      }}
    >
      {children}
    </ModalCommentsContext.Provider>
  );
};
