import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getIniciais } from '@/utils/get-Iniciais-name'
import { UpdateDoctorModal } from './modals/UpdateDoctorModal'
import { DeleteDoctorModal } from './modals/DeleteDoctorModal'
import type { IDoctor } from '@/types/doctor'

interface DoctorTableProps {
  doctors: IDoctor[] | undefined
}

export default function DoctorTable({ doctors }: DoctorTableProps) {


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="lg:w-[300px] font-medium tracking-wide">
            Médico
          </TableHead>
          <TableHead className="hidden lg:table-cell font-medium tracking-wide">
            Cargo
          </TableHead>
          <TableHead className="text-right font-medium tracking-wide ml-auto">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors
          ?.map(row => (
            <TableRow key={row.id} className="">
              <TableCell className="font-medium flex gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>{getIniciais(row.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-600">{row.name}</span>
                  <span className="text-xs">{row.email}</span>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {row.role === 'ADMIN' && 'Administrador'}
                {row.role === 'DOCTOR' && 'Médico'}
              </TableCell>
              <TableCell className={'text-right font-bold text-rose-600'}>
                <div className="flex items-center justify-end gap-4">
                  <UpdateDoctorModal doctorId={row.id} />
                  <DeleteDoctorModal doctorId={row.id} />
                </div>
              </TableCell>
            </TableRow>
          ))
          .slice(0, 6)}
      </TableBody>
    </Table>
  )
}
