import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { CalendarIcon, Clock, Plus, X } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { Input } from '../ui/input'
import z from 'zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { DayWeekPicker, type WeekDayStatus } from '../DayWeekPicker'

export type IAvailableTimesItems = {
  day: WeekDayStatus | string
  start?: string
  end?: string
}

export type AvailableTimesListModalProps = {
  availableTimesItems: IAvailableTimesItems[]
  setAvailableTimesItems: Dispatch<SetStateAction<IAvailableTimesItems[]>>
}

const schema = z.object({
  start: z.string(),
  end: z.string(),
})

export const WeekDayData = [
  'SEGUNDA-FEIRA',
  'TERÇA-FEIRA',
  'QUART-FEIRA',
  'QUINTA-FEIRA',
  'SEXTA-FEIRA',
]
type FormData = z.infer<typeof schema>

export function AvailableTimesListModal({
  availableTimesItems,
  setAvailableTimesItems,
}: AvailableTimesListModalProps) {
  const [itemsData, setItemsData] = useState<string[]>(WeekDayData)
  const [day, setDay] = useState<WeekDayStatus | string>('')

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  })

  function handleRemoveItem(item: IAvailableTimesItems) {
    if (!day) return
    if (itemsData.includes(item.day)) return

    setAvailableTimesItems(prevState =>
      prevState.filter(date => {
        return date.day !== item.day
      })
    )
    setItemsData(prevState => [...prevState, day])
    toast.success('Horário disponível removido!')
  }

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (!itemsData.includes(day)) return
    if (!data.start || !data.end) {
      return toast.warning('Preencha todos os campos!', {
        style: { backgroundColor: '#d45', color: '#fff' },
      })
    }
    if (availableTimesItems.length === 5) {
      return toast.warning('Atingiu o máximo de dias!', {
        style: { backgroundColor: '#d45', color: '#fff' },
      })
    }
    if (data.start > data.end) {
      return toast.warning('Horário inicial não pode ser maior que o final!', {
        style: { backgroundColor: '#d45', color: '#fff' },
      })
    }

    setItemsData(prevState => prevState.filter(date => date !== day))
    setAvailableTimesItems(prevState => [
      ...prevState,
      { day, start: data.start, end: data.end },
    ])

    toast.success('Horário disponível adicionado!')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center justify-between">
          {availableTimesItems.length === 0
            ? 'Adicionar horários'
            : `${availableTimesItems.length} horários disponíveis adicionados`}
          <Plus className="text-zinc-100" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar horários disponíveis</DialogTitle>
          <DialogDescription>
            Selecione os horários disponíveis.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {availableTimesItems.length >= 1 ? (
            <div className="flex gap-4 flex-wrap">
              {availableTimesItems.map(item => (
                <Button
                  key={item.day}
                  size={'sm'}
                  variant={'outline'}
                  onClick={() =>
                    handleRemoveItem({
                      day: item.day,
                      start: item.start,
                      end: item.start,
                    })
                  }
                  className="border-zinc-400 h-auto w-full text-blue-600 justify-between items-center py-2"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <CalendarIcon className="text-zinc-800" />
                      <span className="text-zinc-800 font-semibold">
                        Dia da semana:{' '}
                        <span className="text-zinc-800 font-normal">
                          {item.day}
                        </span>
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Clock className="text-zinc-800" />
                      <span className="text-zinc-800 font-semibold">
                        Início:{' '}
                        <span className="text-zinc-800 font-normal">
                          {item.start}
                        </span>
                      </span>
                      <span className="text-zinc-800 font-semibold">
                        Fim:{' '}
                        <span className="text-zinc-800 font-normal">
                          {item.end}
                        </span>
                      </span>
                    </div>
                  </div>
                  <X className="text-red-800" />
                </Button>
              ))}
            </div>
          ) : (
            <span className="text-sm text-center text-zinc-400">
              Sem horários disponíveis
            </span>
          )}

          <div className="flex flex-col gap-4 border-t border-zinc-400 pt-4">
            <div className="flex gap-4 items-center">
              <Input
                type="time"
                className={errors.start && 'border border-pink-600'}
                {...register('start')}
              />
              <Input
                type="time"
                className={errors.end && 'border border-pink-600'}
                {...register('end')}
              />
            </div>
            <div className="flex gap-4 items-center">
              <DayWeekPicker itemsData={itemsData} day={day} setDay={setDay} />
              <Button
                size={'sm'}
                variant={'default'}
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
                className="bg-blue-600 text-zinc-100 justify-between items-center disabled:cursor-not-allowed"
              >
                <Plus className="text-zinc-100" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" className="hidden" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
