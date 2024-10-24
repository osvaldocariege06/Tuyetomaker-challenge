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
import { Input } from "@/components/ui/input"
import { Camera, EditIcon } from "lucide-react"
import { toast } from "sonner"
import { type ChangeEvent, useState } from "react"
import Image from "next/image"
import z from 'zod'
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RolesList } from "../RolesPopover"
import { useStore } from "@/stores/useStore"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { RoleState } from "@/types/doctor"
import { AvailableTimesListModal, type IAvailableTimesItems } from "./availableTimesListModal"
import { SpecialtiesListModal } from "./SpecialtiesListModal"

enum EditState {
  BASE = 'BASE',
  SECURE = 'SECURE',
  ADVANCED = 'ADVANCED',
}


const schema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório').optional(),
    email: z.string().email('Email inválido').optional(),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').optional(),
    confirmPassword: z.string().min(6, 'Confirme a senha').optional(),
  })
  .refine((data) => {
    // A validação só ocorre se ambos os campos estiverem presentes
    if (data.password && data.confirmPassword) {
      return data.password === data.confirmPassword;
    }
    return true;
  }, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>

interface UpdateDoctorModalProps {
  doctorId: string
}


export function UpdateDoctorModal({ doctorId }: UpdateDoctorModalProps) {
  const { update, findById } = useStore()
  const queryClient = useQueryClient()
  const [selectImage, setSelectImage] = useState<string | null>(null)
  const [roleName, setRoleName] = useState<RoleState>(RoleState.DOCTOR)
  const [editOptions, setEditOptions] = useState<EditState>(EditState.BASE)
  const [specialtiesItems, setSpecialtiesItems] = useState<string[]>([])
  const [availableTimesItems, setAvailableTimesItems] = useState<IAvailableTimesItems[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setSelectImage(file ? URL.createObjectURL(file) : '')
  }

  const { data } = useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => findById(doctorId)
  })


  const onSubmit: SubmitHandler<FormData> = async (data) => {

    await update(doctorId, {
      name: data.name,
      email: data.email,
      password: data.password,
      role: roleName,
      specialties: [],
      availableTimes: []
    })

    queryClient.invalidateQueries({ queryKey: ['doctors'] })

    toast("Médico editado com sucesso!")

    reset({
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    })
    setRoleName(RoleState.DOCTOR)
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <EditIcon className="text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Médico</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para editar.
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
              onChange={(e) => handleImage(e)}
            />
            <label htmlFor="image" className="text-zinc-800 text-sm text-center cursor-pointer">Adicione uma foto de perfil</label>
          </div>

          <div className="flex items-center gap-4 justify-around border-b border-zinc-400 pb-3">
            <Button type="button" variant={editOptions === 'BASE' ? 'default' : 'outline'} onClick={() => setEditOptions(EditState.BASE)}>Básicas</Button>
            <Button type="button" variant={editOptions === 'SECURE' ? 'default' : 'outline'} onClick={() => setEditOptions(EditState.SECURE)}>Segurança</Button>
            <Button type="button" variant={editOptions === 'ADVANCED' ? 'default' : 'outline'} onClick={() => setEditOptions(EditState.ADVANCED)}>Avançadas</Button>
          </div>

          {editOptions === EditState.BASE && <div className="flex flex-col gap-4 py-4">
            <Input
              type="text"
              className={`col-span-3 outline-none ${errors.name && 'border-red-600'}`}
              placeholder="Nome completo"
              defaultValue={data?.name}
              disabled={isLoading}
              {...register('name')}
            />
            <Input
              type="email"
              className={`col-span-3 outline-none ${errors.email && 'border-red-600'}`}
              placeholder="E-mail"
              defaultValue={data?.email}
              disabled={isLoading}
              {...register('email')}
            />
            <RolesList roleName={roleName} setRoleName={setRoleName} />
          </div>}


          {editOptions === EditState.SECURE && <div className="flex flex-col gap-4 py-4">
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
          </div>}

          {editOptions === EditState.ADVANCED && <div className="flex flex-col gap-4 py-4">

            <span className="text-lg font-semibold mt-3">Especialidades</span>
            <SpecialtiesListModal specialtiesItems={specialtiesItems} setSpecialtiesItems={setSpecialtiesItems} />

            <span className="text-lg font-semibold mt-3">Horários disponíveis</span>
            <AvailableTimesListModal availableTimesItems={availableTimesItems} setAvailableTimesItems={setAvailableTimesItems} />
          </div>}


        </form>
        <DialogFooter>
          <Button className="bg-blue-600" type="button" onClick={handleSubmit(onSubmit)}>Editar médico</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
