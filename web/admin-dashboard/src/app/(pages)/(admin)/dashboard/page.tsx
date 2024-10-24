'use client'
import { AppointmentTable } from '@/components/AppointmentTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppointmentStore } from '@/stores/useAppointmentStore'
import type { IAppointment } from '@/types/appointment'
import { withAuth } from '@/utils/withAuth'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

function Page() {
  const { findFutureAppointments, findPastAppointments } = useAppointmentStore()
  const [toggle, setToggle] = useState<
    'appointments-future' | 'appointments-past'
  >('appointments-past')

  const [filteredAppointments, setFilteredAppointments] = useState<
    IAppointment[] | undefined
  >([])
  const [patientNameFilter, setPatientNameFilter] = useState<string>('')

  const { data: appointmentsFuture } = useQuery({
    queryKey: ['findFutureAppointments'],
    queryFn: findFutureAppointments,
    staleTime: 1000 * 60, // 60 seconds
  })

  const { data: appointmentsPast } = useQuery({
    queryKey: ['findPastAppointments'],
    queryFn: findPastAppointments,
    staleTime: 1000 * 60, // 60 seconds
  })

  useEffect(() => {
    let filtered =
      toggle === 'appointments-past' ? appointmentsPast : appointmentsFuture

    if (patientNameFilter) {
      filtered = filtered?.filter(appointment =>
        appointment.patient.name
          .toLowerCase()
          .includes(patientNameFilter.toLowerCase())
      )
    }

    setFilteredAppointments(filtered)
  }, [appointmentsFuture, appointmentsPast, patientNameFilter, toggle])

  return (
    <main className="w-full flex-1 px-9 py-16">
      <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
      <div className="flex items-center justify-between gap-8 mt-4 mb-10">
        <Input
          type="search"
          placeholder="Pesquisar por paciente"
          className="w-[400px]"
          onChange={e => setPatientNameFilter(e.target.value)}
        />
        <div className="flex gap-4 items-center h-12">
          <div className="w-px h-4 bg-zinc-400" />
          <Button
            variant={toggle === 'appointments-past' ? 'secondary' : 'ghost'}
            onClick={() => setToggle('appointments-past')}
          >
            Consultas realizadas
          </Button>
          <Button
            variant={toggle === 'appointments-future' ? 'secondary' : 'ghost'}
            onClick={() => setToggle('appointments-future')}
          >
            Agendamentos futuros
          </Button>
        </div>
      </div>

      {toggle === 'appointments-past' && (
        <AppointmentTable appointments={filteredAppointments} />
      )}
      {toggle === 'appointments-future' && (
        <AppointmentTable appointments={appointmentsFuture} />
      )}
    </main>
  )
}

export default withAuth(Page)