'use client'
import { logoWhiteSmall } from '@/assets/images'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAuthStore } from '@/stores/authStore'
import { getIniciais } from '@/utils/get-Iniciais-name'
import { ChevronDown, LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const Router = useRouter()
  const { logout, isAuthenticated, user, } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      return Router.replace('/auth/login')
    }
  }, [isAuthenticated, Router])

  return (
    <div className="w-full flex-1">
      <header className="flex justify-between items-center w-full bg-blue-700 px-6 h-16 ">
        <div className="flex items-center justify-start gap-16">
          <Image
            src={logoWhiteSmall}
            alt="Agendei Logo"
            width={116}
            height={31}
          />
          <div className="flex items-center gap-4">
            <Link
              href={'/dashboard'}
              className={`tracking-wide ${pathname === '/dashboard' ? 'text-zinc-100 font-semibold' : 'text-zinc-300'}`}
            >
              Dashboard
            </Link>
            <Link
              href={'/appointments'}
              className={`tracking-wide ${pathname === '/appointments' ? 'text-zinc-100 font-semibold' : 'text-zinc-300'}`}
            >
              Agendamentos
            </Link>
            <Link
              href={'/doctors'}
              className={`tracking-wide ${pathname === '/doctors' ? 'text-zinc-100 font-semibold' : 'text-zinc-300'}`}
            >
              Médicos
            </Link>
            <Link
              href={'/reports'}
              className={`tracking-wide ${pathname === '/report' ? 'text-zinc-100 font-semibold' : 'text-zinc-300'}`}
            >
              Relatórios{' '}
            </Link>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'ghost'}
              type="button"
              className="flex items-center justify-end gap-4 hover:bg-transparent"
            >
              <span className="text-sm text-slate-300">{user?.name}</span>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {getIniciais(user?.name)}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="size-5 text-zinc-100" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 p-2 flex flex-col gap-1 w-[220px]">
            <Button variant={'outline'} onClick={() => logout()}>
              Terminar sessão
              <LogOutIcon className="size-5 text-zinc-800" />
            </Button>
          </PopoverContent>
        </Popover>
      </header>
      {children}
    </div>
  )
}
