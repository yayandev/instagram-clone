"use client";
import { createContext, useContext, useState } from "react";

export const ModalAddPostContext = createContext({
  isOpenModalAddPost: false,
  setIsOpenModalAddPost: (isOpenModalAddPost: boolean) => {
    isOpenModalAddPost: isOpenModalAddPost;
  },
});

export const useModalAddPost = () => {
  return useContext(ModalAddPostContext);
};

export const ModalAddPostProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpenModalAddPost, setIsOpenModalAddPost]: any = useState();
  return (
    <ModalAddPostContext.Provider
      value={{
        isOpenModalAddPost,
        setIsOpenModalAddPost,
      }}
    >
      {children}
    </ModalAddPostContext.Provider>
  );
};
