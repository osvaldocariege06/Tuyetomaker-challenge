"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import { useAuthStore } from "@/stores/authStore";

export function withAuth(Component: React.ComponentType) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return function AuthenticatedComponent(props: any) {
    const { user, loadUserFromCookies } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      loadUserFromCookies();

      if (!Cookies.get("token")) {
        router.replace("/login");
      }

    }, [router, loadUserFromCookies]);

    if (!user) return null;

    return <Component {...props} />;
  };
}
