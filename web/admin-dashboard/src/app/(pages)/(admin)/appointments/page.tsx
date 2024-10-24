'use client'
import { AppointmentTable } from '@/components/AppointmentTable'
import { PopoverStatus } from '@/components/PopoverStatus'
import { Input } from '@/components/ui/input'
import { useAppointmentStore } from '@/stores/useAppointmentStore'
import { AppointmentStatus, type IAppointment } from '@/types/appointment'
import { withAuth } from '@/utils/withAuth'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

function Page() {
  const [status, setStatus] = useState<AppointmentStatus>(
    AppointmentStatus.PENDING
  )

  const [filteredAppointments, setFilteredAppointments] = useState<
    IAppointment[] | undefined
  >([])
  const [patientNameFilter, setPatientNameFilter] = useState<string>('')

  const { getAll } = useAppointmentStore()

  const { data: appointments } = useQuery({
    queryKey: ['findAll'],
    queryFn: getAll,
    staleTime: 1000 * 60, // 60 seconds
  })

  useEffect(() => {
    let filtered = appointments

    if (status) {
      filtered = filtered?.filter((appointment) => appointment.status === status);
    }

    if (patientNameFilter) {
      filtered = filtered?.filter(appointment =>
        appointment.patient.name
          .toLowerCase()
          .includes(patientNameFilter.toLowerCase())
      )
    }

    setFilteredAppointments(filtered)
  }, [status, appointments, patientNameFilter])

  return (
    <main className="w-full flex-1 px-9 py-16">
      <h2 className="text-3xl font-bold text-slate-800">Agendamentos</h2>
      <div className="flex justify-between items-center gap-6 mt-4 mb-10">
        <Input
          type="search"
          placeholder="Pesquisar por paciente"
          onChange={e => setPatientNameFilter(e.target.value)}
          value={patientNameFilter}
          className="w-[400px]"
        />
        <PopoverStatus status={status} setStatus={setStatus} />

      </div>

      <AppointmentTable appointments={filteredAppointments} />
    </main>
  )
}

export default withAuth(Page)