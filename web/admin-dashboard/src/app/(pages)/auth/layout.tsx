'use client'
import { background } from "@/assets/images"
import Image from "next/image"
import type { ReactNode } from "react"

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {


  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {children}
      <div className="border flex-1 lg:flex justify-end hidden ">
        <Image src={background} alt="Fundo" width={810} height={757} className="max-h-screen flex-1 bg-cover" />
      </div>
    </div>
  )
}
