'use client'
import DoctorTable from '@/components/DoctorTable'
import { CreateDoctorModal } from '@/components/modals/CreateDoctorModal'
import { Input } from '@/components/ui/input'
import { useStore } from '@/stores/useStore'
import type { IDoctor } from '@/types/doctor'
import { withAuth } from '@/utils/withAuth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

function Page() {

  const [filteredDoctors, setFilteredDoctors] = useState<
    IDoctor[] | undefined
  >([])
  const [doctorNameFilter, setDoctorNameFilter] = useState<string>('')

  const queryClient = useQueryClient()
  const { findAll } = useStore()

  const { data: doctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: findAll,
    staleTime: 1000 * 60, // 60 seconds
  })

  queryClient.invalidateQueries({ queryKey: ['doctors'] })


  useEffect(() => {
    let filtered =
      doctors

    if (doctorNameFilter) {
      filtered = filtered?.filter(doctors =>
        doctors.name
          .toLowerCase()
          .includes(doctorNameFilter.toLowerCase())
      )
    }

    setFilteredDoctors(filtered)
  }, [doctorNameFilter, doctors])


  return (
    <main className='w-full flex-1 px-9 py-16'>
      <div className="flex justify-between items-center gap-6">
        <h2 className='text-3xl font-bold text-slate-800'>Médicos</h2>
        <CreateDoctorModal />
      </div>

      <div className="my-6">
        <Input
          type="search"
          placeholder="Pesquisar por médico"
          className="w-[400px]"
          onChange={e => setDoctorNameFilter(e.target.value)}
        />
      </div>

      <DoctorTable doctors={filteredDoctors} />
    </main>
  )
}

export default withAuth(Page)