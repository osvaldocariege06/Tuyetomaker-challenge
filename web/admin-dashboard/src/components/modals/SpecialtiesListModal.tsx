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
import { Plus, X } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { Input } from '../ui/input'
import z from 'zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

type SpecialtiesListModalProps = {
  specialtiesItems: string[]
  setSpecialtiesItems: Dispatch<SetStateAction<string[]>>
}

const schema = z.object({
  specialty: z.string().min(1, 'Nome é obrigatório'),
})

type FormData = z.infer<typeof schema>

export function SpecialtiesListModal({
  specialtiesItems,
  setSpecialtiesItems,
}: SpecialtiesListModalProps) {
  const [itemsData, setItemsData] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  })

  function handleRemoveItem(item: string) {
    if (itemsData.includes(item)) return
    setSpecialtiesItems(prevState => prevState.filter(name => name !== item))
    setItemsData(prevState => [...prevState, item])
  }

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (specialtiesItems.includes(data.specialty)) return
    setItemsData(prevState => prevState.filter(name => name !== data.specialty))
    setSpecialtiesItems(prevState => [...prevState, data.specialty])

    toast.success('Especialidade adicionada!')

    reset({
      specialty: '',
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center justify-between">
          {specialtiesItems.length === 0
            ? 'Adicionar especialidades'
            : `${specialtiesItems.length} especialidades adicionadas`}
          <Plus className="text-zinc-100" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Especialidades</DialogTitle>
          <DialogDescription>
            Insira as especialidades que deseja adicionar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {specialtiesItems.length >= 1 ? (
            <div className="flex gap-4 flex-wrap py-2 px-3 rounded-lg border border-zinc-400">
              {specialtiesItems.map(item => (
                <Button
                  key={item}
                  size={'sm'}
                  variant={'outline'}
                  onClick={() => handleRemoveItem(item)}
                  className="border-blue-600 text-blue-600 justify-between items-center"
                >
                  {item}
                  <X className="text-red-800" />
                </Button>
              ))}
            </div>
          ) : (
            <span className="text-sm text-center text-zinc-400">
              Sem especialidades
            </span>
          )}

          <div className="flex gap-4 border-t border-zinc-400 pt-4">
            <Input
              placeholder="Especialidade.."
              className={errors.specialty && 'border border-pink-600'}
              {...register('specialty')}
            />
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
        <DialogFooter>
          <Button type="button" className="hidden" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
