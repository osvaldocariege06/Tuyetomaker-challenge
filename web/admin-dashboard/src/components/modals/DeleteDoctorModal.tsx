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
import { useDoctorStore } from '@/stores/useDoctorStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface DeleteDoctorModalProps {
  doctorId: string
}

export function DeleteDoctorModal({ doctorId }: DeleteDoctorModalProps) {
  const { remove } = useDoctorStore()
  const queryClient = useQueryClient()

  const { mutateAsync: removeFn } = useMutation({
    mutationFn: remove,
  })

  const onSubmit = async () => {
    await removeFn(doctorId)

    toast.success('Médico eliminado com sucesso!')
    queryClient.invalidateQueries({ queryKey: ['doctors'] })
    window.document.location.reload()
  }

  if (!doctorId) return toast.error('Médico não encontrado!')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Trash2 className="text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar Médico</DialogTitle>
          <DialogDescription>
            Está preste a eliminar este médico, deseja continuar?.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant={'destructive'} type="submit" onClick={onSubmit}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
