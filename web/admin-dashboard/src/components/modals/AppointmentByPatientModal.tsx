import React, { type ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,

} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useQuery } from '@tanstack/react-query'
import { usePatientStore } from '@/stores/usePatientStore'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getIniciais } from '@/utils/get-Iniciais-name'
import { Button } from '../ui/button'
import { AppointmentStatus } from '@/types/appointment'

interface AppointmentByPatientProps {
  patientId: string
  children: ReactNode
}

export default function AppointmentByPatientModal({ patientId, children }: AppointmentByPatientProps) {
  const { findAppointmentsByPatientId, findById } = usePatientStore()

  const { data: patient } = useQuery({
    queryKey: ['findById', patientId],
    queryFn: () => findById(patientId),
    staleTime: 1000 * 60 // 60 seconds
  })

  const { data: appointments } = useQuery({
    queryKey: ['findAppointmentsByPatientId', patientId],
    queryFn: () => findAppointmentsByPatientId(patientId),
    staleTime: 1000 * 60 // 60 seconds
  })


  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <div className='flex justify-start items-center gap-4'>
            <Avatar className='w-20 h-20'>
              <AvatarImage className='w-20 h-20' />
              <AvatarFallback >{getIniciais(patient?.name)}</AvatarFallback>
            </Avatar>

            <div className='flex flex-col '>
              <DialogTitle>{patient?.name}</DialogTitle>
              <DialogDescription>{patient?.email}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className='mt-8 border-b'>
          <h2 className='text-lg font-semibold text-zinc-800'>Histórico de agendamentos</h2>
          <p className='text-zinc-600'>
            Todos os agendamentos feito pelo paciente.
          </p>
        </div>



        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="lg:w-[300px] font-medium tracking-wide">
                Médicos
              </TableHead>
              <TableHead className="hidden lg:table-cell font-medium tracking-wide">
                Serviço
              </TableHead>
              <TableHead className="text-right font-medium tracking-wide ml-auto">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments
              ?.map(row => (
                <TableRow key={row.id} className="">
                  <TableCell className="font-medium flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>{getIniciais(row.doctor.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-600">{row.doctor.name}</span>
                      <span className="text-xs">{row.doctor.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {row.doctor.role === 'ADMIN' && 'Administrador'}
                    {row.doctor.role === 'DOCTOR' && 'Médico'}
                  </TableCell>
                  <TableCell
                    className={'text-right font-bold'}
                  >
                    <div className="flex items-center justify-end gap-4">
                      {row.status !== AppointmentStatus.CONFIRMED && <Button size={'sm'} variant={'outline'} className='text-sm text-blue-600'>Confirmar</Button>}
                      <Button size={'sm'} variant={'outline'} className='text-sm text-orange-600'>Reagendar</Button>
                      {row.status !== AppointmentStatus.CANCELED && <Button size={'sm'} variant={'destructive'} className='text-sm'>Cancelar</Button>}

                    </div>
                  </TableCell>
                </TableRow>
              ))
              .slice(0, 6)}
          </TableBody>
        </Table>

        <DialogFooter>
          <DialogClose hidden>Fechar</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
