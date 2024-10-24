'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.replace('/auth/login')
    }, 1000);
  }, [router])

  return <SplashScreen />
}
