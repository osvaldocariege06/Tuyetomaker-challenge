import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { RoleState } from "@/types/doctor";



interface RolesListProps {
  roleName: string
  setRoleName: Dispatch<SetStateAction<RoleState>>
}

export function RolesList({ roleName, setRoleName }: RolesListProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} type="button" className="flex items-center justify-between gap-4 hover:bg-transparent">
          {roleName === 'ADMIN' && 'Administrador'}
          {roleName === 'DOCTOR' && 'Médico'}
          <ChevronDown className='size-5 text-zinc-800' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-2 p-2 flex flex-col gap-1 ">
        <Button variant={'outline'} onClick={() => setRoleName(RoleState.ADMIN)}>
          Administrador
        </Button>
        <Button variant={'outline'} onClick={() => setRoleName(RoleState.DOCTOR)}>
          Médico
        </Button>

      </PopoverContent>
    </Popover>
  )
}