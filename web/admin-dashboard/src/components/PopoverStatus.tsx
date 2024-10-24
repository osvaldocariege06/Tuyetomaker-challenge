'use client'

import type * as React from 'react'
import { ChevronDown, ChevronLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { AppointmentStatus } from '@/types/appointment'

interface AppointmentProps {
  status: AppointmentStatus
  setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
}

export function PopoverStatus({
  status = AppointmentStatus.PENDING,
  setStatus,
}: AppointmentProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[220px] justify-start text-left font-normal h-11 border-zinc-500',
            status === AppointmentStatus.PENDING && 'bg-zinc-600 text-white',
            status === AppointmentStatus.RESCHEDULED &&
              'bg-yellow-600 text-white',
            status === AppointmentStatus.CONFIRMED && 'bg-green-600 text-white',
            status === AppointmentStatus.CANCELED && 'bg-red-600 text-white',
            !status && 'text-muted-foreground'
          )}
        >
          <ChevronDown className="size-5 text-zinc-100" />
          {status === AppointmentStatus.PENDING && 'PENDENTES'}
          {status === AppointmentStatus.RESCHEDULED && 'REAGENDADOS'}
          {status === AppointmentStatus.CONFIRMED && 'CONFIRMADOS'}
          {status === AppointmentStatus.CANCELED && 'CANCELADOS'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-2 p-2 flex flex-col gap-1 w-[220px]">
        <Button
          variant={'outline'}
          onClick={() => setStatus(AppointmentStatus.PENDING)}
          className={
            status === AppointmentStatus.PENDING ? 'bg-zinc-600 text-white' : ''
          }
        >
          PENDENTES
          <ChevronLeft className="size-5 text-zinc-100" />
        </Button>
        <Button
          variant={'outline'}
          onClick={() => setStatus(AppointmentStatus.RESCHEDULED)}
          className={
            status === AppointmentStatus.RESCHEDULED
              ? 'bg-yellow-600 text-white'
              : ''
          }
        >
          REAGENDADOS
          <ChevronLeft className="size-5 text-zinc-100" />
        </Button>
        <Button
          variant={'outline'}
          onClick={() => setStatus(AppointmentStatus.CONFIRMED)}
          className={
            status === AppointmentStatus.CONFIRMED
              ? 'bg-green-600 text-white'
              : ''
          }
        >
          CONFIRMADOS
          <ChevronLeft className="size-5 text-zinc-100" />
        </Button>
        <Button
          variant={'outline'}
          onClick={() => setStatus(AppointmentStatus.CANCELED)}
          className={
            status === AppointmentStatus.CANCELED ? 'bg-red-600 text-white' : ''
          }
        >
          CANCELADOS
          <ChevronLeft className="size-5 text-zinc-100" />
        </Button>
      </PopoverContent>
    </Popover>
  )
}
