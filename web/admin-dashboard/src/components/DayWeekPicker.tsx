'use client'

import type { Dispatch, SetStateAction } from 'react'
import 'react-day-picker/style.css'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'

export enum WeekDayStatus {
  MONDAY = 'SEGUNDA-FEIRA',
  TUESDAY = 'TERÇA-FEIRA',
  WEDNESDAY = 'QUART-FEIRA',
  THURSDAY = 'QUINTA-FEIRA',
  FRIDAY = 'SEXTA-FEIRA',
}

export interface CalendarProps {
  itemsData: string[]
  day: WeekDayStatus | string
  setDay: Dispatch<SetStateAction<WeekDayStatus | string>>
}

export function DayWeekPicker({ itemsData, day, setDay }: CalendarProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className="w-full flex justify-between items-center"
        >
          {day || 'Selecione um dia da semana'}
          <ChevronDown className="text-red-800" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-2 p-2 flex flex-col gap-1 w-[220px]">
        {itemsData.map(item => (
          <Button key={item} variant={'outline'} onClick={() => setDay(item)}>
            {item}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
