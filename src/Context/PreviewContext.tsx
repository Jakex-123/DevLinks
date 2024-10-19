"use client"
import { createContext, useState, ReactNode } from "react";

interface PreviewContextType {
  openPreview: boolean;
  togglePreview: () => void;
}

const PreviewContext = createContext<PreviewContextType>({
  openPreview: false,
  togglePreview: () => {},
});

const PreviewProvider = ({ children }: { children: ReactNode }) => {
  const [openPreview, setOpenPreview] = useState(false);

  const togglePreview = () => setOpenPreview(!openPreview);

  return (
    <PreviewContext.Provider value={{ openPreview, togglePreview }}>
      {children}
    </PreviewContext.Provider>
  );
};

export { PreviewContext, PreviewProvider };
