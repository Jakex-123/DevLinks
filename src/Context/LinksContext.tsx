"use client";
import { LinkType } from "@/types/types";
import { createContext, useState, ReactNode } from "react";


// Define the context type with the correct links state
interface LinksContextType {
  links: LinkType[]; // Array of Link objects
  setLinks: (newLinks: LinkType[]) => void; // Function to set links, accepts an array of Link objects
}

// Create the context with default values
const LinksContext = createContext<LinksContextType>({
  links: [],
  setLinks: () => {},
});

const LinksProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<LinkType[]>([]); // Initialize links state as an array of Link objects

  return (
    <LinksContext.Provider value={{ links, setLinks }}>
      {children}
    </LinksContext.Provider>
  );
};

export { LinksContext, LinksProvider };
