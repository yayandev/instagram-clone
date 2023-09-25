"use client";
import { createContext, useContext, useState } from "react";

export const ModalPostOptionsContext = createContext({
  isOpen: false,
  postId: null,
  author: null,
  setAuthor: (setAuthor: any) => {
    author: setAuthor;
  },

  setPostId: (id: any) => {
    postId: id;
  },
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
  const [postId, setPostId]: any = useState(null);
  const [author, setAuthor] = useState(null);

  return (
    <ModalPostOptionsContext.Provider
      value={{
        isOpen,
        setIsOpen,
        postId,
        setPostId,
        author,
        setAuthor,
      }}
    >
      {children}
    </ModalPostOptionsContext.Provider>
  );
};
