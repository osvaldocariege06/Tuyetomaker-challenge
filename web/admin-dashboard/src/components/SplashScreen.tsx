import { logoLarge } from '@/assets/images'
import Image from 'next/image'
import React from 'react'

export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-blue-900">
      <Image
        className="dark:invert animate-bounce"
        src={logoLarge}
        alt="Agendai Logo"
        width={180}
        height={38}
        priority
      />
    </div>
  )
}
