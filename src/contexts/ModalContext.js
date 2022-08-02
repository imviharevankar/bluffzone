import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [openSearch, setOpenSearch] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);

  const value = {
    openSearch,
    loaderModal,
    setOpenSearch,
    setLoaderModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
