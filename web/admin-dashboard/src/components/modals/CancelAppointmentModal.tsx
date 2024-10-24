import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppointmentStore } from "@/stores/useAppointmentStore"
import { useQueryClient } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { toast } from "sonner"

interface CancelAppointmentModalProps {
  appointmentId: string
  children: ReactNode
}


export function CancelAppointmentModal({ appointmentId, children }: CancelAppointmentModalProps) {
  const { cancelAppointment } = useAppointmentStore()
  const queryClient = useQueryClient()


  const onSubmit = async () => {
    await cancelAppointment(appointmentId)
    queryClient.invalidateQueries({ queryKey: ['doctors'] })

    toast('Médico eliminado com sucesso!');
  };

  if (!appointmentId) return toast("Agendamento não encontrado!")

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cancelar agendamento</DialogTitle>
          <DialogDescription>
            Está preste a cancelar este agendamento, deseja continuar?.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant={'destructive'} type="submit" onClick={onSubmit}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
