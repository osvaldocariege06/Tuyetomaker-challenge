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
import { Input } from '@/components/ui/input'
import { Camera } from 'lucide-react'
import { toast } from 'sonner'
import { type ChangeEvent, useState } from 'react'
import Image from 'next/image'
import z from 'zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RolesList } from '../RolesPopover'
import { useDoctorStore } from '@/stores/useDoctorStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SpecialtiesListModal } from './SpecialtiesListModal'
import {
  AvailableTimesListModal,
  type IAvailableTimesItems,
} from './availableTimesListModal'
import { RoleState } from '@/types/doctor'

enum EditState {
  BASE = 'BASE',
  SECURE = 'SECURE',
  ADVANCED = 'ADVANCED',
}

const schema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme a senha'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

export function CreateDoctorModal() {
  const { create } = useDoctorStore()
  const queryClient = useQueryClient()
  const [selectImage, setSelectImage] = useState<string | null>(null)
  const [editOptions, setEditOptions] = useState<EditState>(EditState.BASE)
  const [roleName, setRoleName] = useState<RoleState>(RoleState.DOCTOR)
  const [specialtiesItems, setSpecialtiesItems] = useState<string[]>([])
  const [availableTimesItems, setAvailableTimesItems] = useState<
    IAvailableTimesItems[]
  >([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  })

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setSelectImage(file ? URL.createObjectURL(file) : '')
  }

  const { mutateAsync: createDoctorFn } = useMutation({
    mutationKey: ['create'],
    mutationFn: create,
  })

  const onSubmit: SubmitHandler<FormData> = async data => {
    await createDoctorFn({
      name: data.name,
      email: data.email,
      password: data.password,
      role: roleName,
      specialties: specialtiesItems,
      availableTimes: availableTimesItems,
    })

    toast.success('Médico registrado com sucesso!')

    reset({
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    })
    setRoleName(RoleState.DOCTOR)

    queryClient.invalidateQueries({ queryKey: ['doctors'] })
    window.document.location.reload()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-blue-600">
          Novo Médico
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Médico</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para registrar um médico.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <div className=" flex flex-col gap-2 justify-center items-center">
            <label
              htmlFor="image"
              className="h-24 w-24 mx-auto cursor-pointer overflow-hidden rounded-full border border-zinc-800"
            >
              {selectImage ? (
                <Image
                  src={selectImage}
                  alt="Imagem de modal"
                  className="h-24 w-24 rounded-full bg-center object-cover"
                  width={400}
                  height={240}
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full">
                  <Camera className="size-10 text-zinc-800" />
                </div>
              )}
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleImage(e)}
            />
            <label
              htmlFor="image"
              className="text-zinc-800 text-sm text-center cursor-pointer"
            >
              Adicione uma foto de perfil
            </label>
          </div>

          <div className="flex items-center gap-4 justify-around border-b border-zinc-400 pb-3">
            <Button
              type="button"
              variant={editOptions === 'BASE' ? 'default' : 'outline'}
              onClick={() => setEditOptions(EditState.BASE)}
            >
              Básicas
            </Button>
            <Button
              type="button"
              variant={editOptions === 'SECURE' ? 'default' : 'outline'}
              onClick={() => setEditOptions(EditState.SECURE)}
            >
              Segurança
            </Button>
            <Button
              type="button"
              variant={editOptions === 'ADVANCED' ? 'default' : 'outline'}
              onClick={() => setEditOptions(EditState.ADVANCED)}
            >
              Avançadas
            </Button>
          </div>

          {editOptions === EditState.BASE && (
            <div className="flex flex-col gap-4 py-4">
              <Input
                type="text"
                className={`col-span-3 outline-none ${errors.name && 'border-red-600'}`}
                placeholder="Nome completo"
                disabled={isLoading}
                {...register('name')}
              />
              <Input
                type="email"
                className={`col-span-3 outline-none ${errors.email && 'border-red-600'}`}
                placeholder="E-mail"
                disabled={isLoading}
                {...register('email')}
              />
              <RolesList roleName={roleName} setRoleName={setRoleName} />
            </div>
          )}

          {editOptions === EditState.SECURE && (
            <div className="flex flex-col gap-4 py-4">
              <span className="text-lg font-semibold mt-3">Segurança</span>
              <Input
                type="password"
                className={`col-span-3 outline-none ${errors.password && 'border-red-600'}`}
                placeholder="Senha"
                autoComplete="current-password"
                disabled={isLoading}
                {...register('password')}
              />
              <Input
                type="password"
                className={`col-span-3 outline-none ${errors.confirmPassword && 'border-red-600'}`}
                placeholder="Confirmar senha"
                autoComplete="new-password"
                disabled={isLoading}
                {...register('confirmPassword')}
              />
            </div>
          )}

          {editOptions === EditState.ADVANCED && (
            <div className="flex flex-col gap-4 py-4">
              <span className="text-lg font-semibold mt-3">Especialidades</span>
              <SpecialtiesListModal
                specialtiesItems={specialtiesItems}
                setSpecialtiesItems={setSpecialtiesItems}
              />

              <span className="text-lg font-semibold mt-3">
                Horários disponíveis
              </span>
              <AvailableTimesListModal
                availableTimesItems={availableTimesItems}
                setAvailableTimesItems={setAvailableTimesItems}
              />
            </div>
          )}
        </form>
        <DialogFooter>
          <Button
            className="bg-blue-600"
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Registrar médico
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
