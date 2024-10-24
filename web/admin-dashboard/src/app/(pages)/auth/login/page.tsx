'use client'
import { logoSmall } from '@/assets/images'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

type FormData = z.infer<typeof schema>;


enum Role {
  DOCTOR = 'Médico',
  ADMIN = 'administrador',
}

export default function Page() {
  const { login: onLogin, isAuthenticated } = useAuthStore()
  const Router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, register, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const success = await onLogin(data.email, data.password)

    if (success) {
      Router.push("/dashboard");
      setIsLoading(true)
    } else {
      alert("Login failed. Please try again.");
    }

    setIsLoading(false)

    reset({
      email: '',
      password: '',
    })
  };

  useEffect(() => {
    if (isAuthenticated) {
      Router.replace('/appointments')
    }
  }, [isAuthenticated, Router])



  return (
    <div className='flex flex-col justify-between items-center pb-11 pt-16'>
      <header>
        <Image src={logoSmall} alt='Agendei Logo' width={165} height={38} className='mx-auto' />
        <p className="text-xl font-medium leading-relaxed tracking-wide max-w-[310px] text-center mt-9">Gerencie seus agendamentos
          de forma descomplicada.</p>
      </header>

      <form className='flex flex-col gap-6 w-[270px]'>
        <span className='text-center'>Acesse sua conta</span>
        <div className='flex flex-col gap-4'>
          <input type="email" placeholder='E-mail' disabled={isLoading} className={`w-full h-11 rounded-md bg-slate-300 px-3 outline-none disabled:cursor-not-allowed ${errors.email && 'border-2 border-red-600'}`} {...register('email')} />
          <input type="password" placeholder='Senha' disabled={isLoading} className={`w-full h-11 rounded-md bg-slate-300 px-3 outline-none disabled:cursor-not-allowed ${errors.password && 'border-2 border-red-600'}`} {...register('password')} />
          <button type="submit" onClick={handleSubmit(onSubmit)} className='w-full h-11 rounded-md bg-blue-600 hover:bg-blue-800 transition-all text-white active:scale-95 flex justify-center items-center'>Acessar</button>
        </div>
      </form>

      <span className="">
        Não tenho conta? <Link href={'/auth/register'} className='text-blue-600'>Criar conta agora.</Link>
      </span>
    </div>
  )
}
