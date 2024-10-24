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
import { useStore } from "@/stores/useStore"
import { useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

interface DeleteDoctorModalProps {
  doctorId: string
}


export function DeleteDoctorModal({ doctorId }: DeleteDoctorModalProps) {
  const { remove } = useStore()
  const queryClient = useQueryClient()


  const onSubmit = async () => {
    await remove(doctorId)
    queryClient.invalidateQueries({ queryKey: ['doctors'] })

    toast('Médico eliminado com sucesso!');
  };

  if (!doctorId) return toast("Médico não encontrado!")

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
          <Button variant={'destructive'} type="submit" onClick={onSubmit}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
