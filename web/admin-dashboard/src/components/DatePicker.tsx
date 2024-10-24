'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface CalendarProps {
  date?: Date
  setDate: Dispatch<SetStateAction<Date | undefined>>
}

export function Calendar({ date, setDate }: CalendarProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[240px] pl-3 text-left font-normal')}
        >
          <span>{format(date || new Date(), 'PPP', { locale: ptBR })}</span>
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <DayPicker
          mode="single"
          locale={ptBR}
          pagedNavigation
          numberOfMonths={1}
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  )
}
