'use client'
import { logoSmall } from '@/assets/images'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useRouter } from 'next/navigation'

const stepOneSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone deve ter pelo menos 9 dígitos'),
});

const stepTwoSchema = z.object({
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirme a senha'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não correspondem',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof stepOneSchema> & z.infer<typeof stepTwoSchema>;

export default function Page() {
  const router = useRouter()
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(step === 1 ? stepOneSchema : stepTwoSchema),
  });


  const handleNextStep = async () => {
    const isStepOneValid = await trigger();
    if (isStepOneValid) {
      const currentData = getValues();
      setFormData((prev) => ({ ...prev, ...currentData }));
      setStep(2);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const finalData = { ...formData, ...data };
    router.replace('/dashboard')
    console.log('Formulário enviado com sucesso:', finalData);

    reset({
      email: '',
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
    })
  };



  return (
    <div className='flex flex-col justify-between items-center pb-11 pt-16'>
      <header>
        <Image src={logoSmall} alt='Agendei Logo' width={165} height={38} className='mx-auto' />
        <p className="text-xl font-medium leading-relaxed tracking-wide max-w-[310px] text-center mt-9">Crie sua conta agora mesmo.</p>
      </header>

      <form className='flex flex-col gap-6 w-[270px]'>
        <span className='text-center'>Preencha os campos abaixo com sua informações básicas</span>
        <div className='flex flex-col gap-4'>
          {
            step === 1 && (
              <>
                <input type="text" placeholder='Nome completo' disabled={isValid} className={`w-full h-11 rounded-md bg-slate-300 px-3 outline-none disabled:cursor-not-allowed ${errors.name && 'border-2 border-red-600'}`} {...register('name')} />
                <input type="email" placeholder='E-mail' disabled={isValid} className={`w-full h-11 rounded-md bg-slate-300 px-3 outline-none disabled:cursor-not-allowed ${errors.email && 'border-2 border-red-600'}`} {...register('email')} />
                <input type="number" placeholder='Telemóvel' disabled={isValid} className={`w-full h-11 rounded-md bg-slate-300 px-3 outline-none disabled:cursor-not-allowed ${errors.phone && 'border-2 border-red-600'}`} {...register('phone')} />
                <button type="button" onClick={handleNextStep} className='w-full h-11 rounded-md bg-blue-600 hover:bg-blue-800 transition-all text-white active:scale-95 flex justify-center items-center'>Continuar</button>
              </>
            )
          }
          {
            step === 2 && (
              <>
                <input type="password" placeholder='Senha' autoComplete='new-password' disabled={isValid} className={`w-full h-11 rounded-md bg-slate-300 px-3 outline-none disabled:cursor-not-allowed ${errors.password && 'border-2 border-red-600'}`} {...register('password')} />
                <input type="password" placeholder='Confirmar senha' autoComplete='new-password' disabled={isValid} className={`w-full h-11 rounded-md bg-slate-300 px-3 outline-none disabled:cursor-not-allowed ${errors.confirmPassword && 'border-2 border-red-600'}`} {...register('confirmPassword')} />
                <button type="submit" onClick={handleSubmit(onSubmit)} className='w-full h-11 rounded-md bg-blue-600 hover:bg-blue-800 transition-all text-white active:scale-95 flex justify-center items-center'>Criar minha conta</button>
              </>
            )
          }
        </div>
      </form>

      <span className="">
        Já tenho uma conta? <Link href={'/auth/login'} className='text-blue-600'>Acessar agora.</Link>
      </span>
    </div>
  )
}
