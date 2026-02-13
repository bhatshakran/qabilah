"use client";

import { useEffect } from "react";
import { useSignin } from "@/app/contexts/signinContext";
import { User } from "@/app/contexts/authContext";

export function useSigninPopup(user: User | null) {
  const { openSignin, closeSignin } = useSignin();

  useEffect(() => {
    if (!user) {
      openSignin();
    }

    return () => closeSignin();
  }, [user, openSignin, closeSignin]);
}
