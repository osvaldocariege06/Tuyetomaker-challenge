import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAppointmentStore } from '@/stores/useAppointmentStore'
import { useQueryClient } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'
import { Clock } from 'lucide-react'
import { format } from 'date-fns'

interface RescheduleAppointmentModalModalProps {
  appointmentId: string
  children: ReactNode
}

export function RescheduleAppointmentModalModal({
  appointmentId,
  children,
}: RescheduleAppointmentModalModalProps) {
  const { rescheduleAppointment } = useAppointmentStore()
  const queryClient = useQueryClient()

  const [newDateTime, setNewDateTime] = useState<Date>(new Date())

  const onSubmit = async () => {
    await rescheduleAppointment(appointmentId, newDateTime)
    queryClient.invalidateQueries({ queryKey: ['doctors'] })

    toast.success('Agendamento reajustado com sucesso!')
    window.document.location.reload()
  }

  if (!appointmentId) return toast.info('Agendamento não encontrado!')

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reajustar agendamento</DialogTitle>
          <DialogDescription>
            Está preste a reajustar este agendamento, deseja continuar?.
          </DialogDescription>
        </DialogHeader>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className="flex justify-between items-center"
            >
              {format(newDateTime, "EEEE, 'dia' dd 'de' MMMM", {
                locale: ptBR,
              })}
              <Clock />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 p-2 flex w-auto">
            <DayPicker
              mode="single"
              locale={ptBR}
              required
              pagedNavigation
              numberOfMonths={1}
              selected={newDateTime}
              onSelect={setNewDateTime}
            />
          </PopoverContent>
        </Popover>

        <DialogFooter>
          <Button type="submit" className="bg-blue-600" onClick={onSubmit}>
            Reajustar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
