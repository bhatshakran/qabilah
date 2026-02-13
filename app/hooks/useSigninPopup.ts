"use client";

import { useEffect } from "react";
import { useSignin } from "frontend/app/contexts/signinContext";
import { User } from "frontend/app/contexts/authContext";

export function useSigninPopup(user: User | null) {
  const { openSignin, closeSignin } = useSignin();

  useEffect(() => {
    if (!user) {
      openSignin();
    }

    return () => closeSignin();
  }, [user, openSignin, closeSignin]);
}
