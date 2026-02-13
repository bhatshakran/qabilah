"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SigninContextType = {
  showSignin: boolean;
  setShowSignin: (value: boolean) => void;
  openSignin: () => void;
  closeSignin: () => void;
};

const SigninContext = createContext<SigninContextType | undefined>(undefined);

export function SigninProvider({ children }: { children: ReactNode }) {
  const [showSignin, setShowSignin] = useState(false);

  const openSignin = () => setShowSignin(true);
  const closeSignin = () => setShowSignin(false);

  return (
    <SigninContext.Provider
      value={{
        showSignin,
        setShowSignin,
        openSignin,
        closeSignin,
      }}
    >
      {children}
    </SigninContext.Provider>
  );
}

export function useSignin() {
  const context = useContext(SigninContext);

  if (!context) {
    throw new Error("useSignin must be used inside SigninProvider");
  }

  return context;
}
