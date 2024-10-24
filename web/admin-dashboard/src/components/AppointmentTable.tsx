'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAppointmentStore } from '@/stores/useAppointmentStore'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getIniciais } from '@/utils/get-Iniciais-name'
import { format } from 'date-fns'
import { CancelAppointmentModal } from './modals/CancelAppointmentModal'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { AppointmentStatus, type IAppointment } from '@/types/appointment'
import { RescheduleAppointmentModalModal } from './modals/rescheduleAppointmentModal'
import AppointmentByPatientModal from './modals/AppointmentByPatientModal'
import { CheckCircle2, CircleDashed } from 'lucide-react'

interface appointmentsTablesProps {
  appointments: IAppointment[] | undefined
}

export function AppointmentTable({ appointments }: appointmentsTablesProps) {
  const { confirmAppointment } = useAppointmentStore()

  return (
    <div className="flex flex-col gap-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="lg:w-[300px] font-medium tracking-wide">
              Paciente
            </TableHead>
            <TableHead className="lg:w-[300px] font-medium tracking-wide">
              Médico
            </TableHead>
            <TableHead className="hidden lg:table-cell font-medium tracking-wide">
              Status
            </TableHead>
            <TableHead className="hidden lg:table-cell font-medium tracking-wide">
              Data / Hora
            </TableHead>
            <TableHead className="text-right font-medium tracking-wide ml-auto">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments?.map(row => (
            <TableRow key={row.id} className="table-row">
              <TableCell key={row.doctor.id} className="font-medium flex gap-4 justify-start">
                <AppointmentByPatientModal patientId={row.patientId}>
                  <Button variant={'ghost'} className='pl-0'>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {getIniciais(row.patient.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-gray-600">{row.patient.name}</span>
                      <span className="text-xs">{row.patient.email}</span>
                    </div>
                  </Button>
                </AppointmentByPatientModal>
              </TableCell>
              <TableCell className="">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      {getIniciais(row.doctor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-600">{row.doctor.name}</span>
                    <span className="text-xs">{row.doctor.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">

                {row.status === AppointmentStatus.CONFIRMED && <CheckCircle2 className={'text-blue-600'} />}
                {row.status === AppointmentStatus.CANCELED && <CircleDashed className={'text-pink-600'} />}
                {row.status === AppointmentStatus.RESCHEDULED && <CircleDashed className={'text-yellow-600'} />}
                {row.status === AppointmentStatus.PENDING && <CircleDashed className={'text-zinc-600'} />}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {format(row.dateTime, 'dd/MM/yyy HH:mm')}
              </TableCell>

              <TableCell className={'text-right'}>
                <div className="flex items-center justify-end gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={'ghost'}>
                        <span className="text-xl font-bold">...</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="mt-2 p-2 flex flex-col gap-1 w-[220px]">
                      <Button
                        variant={'default'}
                        disabled={row.status === AppointmentStatus.CONFIRMED}
                        onClick={() => confirmAppointment(row.id)}
                      >
                        Confirmar
                      </Button>
                      <RescheduleAppointmentModalModal appointmentId={row.id}>
                        <Button variant={'default'}>Reagendar</Button>
                      </RescheduleAppointmentModalModal>
                      <CancelAppointmentModal appointmentId={row.id}>
                        <Button
                          variant={'destructive'}
                          disabled={row.status === AppointmentStatus.CANCELED}
                        >
                          Cancelar
                        </Button>
                      </CancelAppointmentModal>
                    </PopoverContent>
                  </Popover>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {appointments?.length === 0 && (
        <div className="flex justify-center items-center">
          <span className="text-center text-zinc-500">Nenhum resultado</span>
        </div>
      )}
    </div>
  )
}
