import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Plus, X } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from "react"


type PermissionListModalProps = {
  items: string[],
  setItems: Dispatch<SetStateAction<string[]>>
}

export function PermissionListModal({ items, setItems }: PermissionListModalProps) {

  const [itemsData, setItemsData] = useState([
    'appointment:read', 'appointment:write', 'report:read', 'report:write'
  ])

  function handleAddItem(item: string) {
    if (items.includes(item)) return
    setItemsData(prevState => prevState.filter(name => name !== item))
    setItems(prevState => [...prevState, item])
  }

  function handleRemoveItem(item: string) {
    if (itemsData.includes(item)) return
    setItems(prevState => prevState.filter(name => name !== item))
    setItemsData(prevState => [...prevState, item])
  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center justify-between">
          {items.length === 0 ? 'Adicionar permissões' : `${items.length} permissões adicionadas`}
          <Plus className='text-zinc-100' />
        </Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar permissões</DialogTitle>
          <DialogDescription>
            Selecione as permissões que deseja adicionar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">


          {items.length >= 1 ?
            <div className="flex gap-4 flex-wrap py-2 px-3 rounded-lg border border-zinc-400">
              {items.map(item => (
                <Button key={item} size={'sm'} variant={'outline'} onClick={() => handleRemoveItem(item)} className='border-blue-600 text-blue-600 justify-between items-center'>
                  {item}
                  <X className='text-red-800' />
                </Button>
              ))}
            </div> :
            <span className="text-sm text-center text-zinc-400">Sem permissões</span>
          }

          <div className="flex flex-wrap gap-4 border-t border-zinc-400 pt-4">
            {itemsData.map(item => (
              <Button key={item} size={'sm'} variant={'outline'} onClick={() => handleAddItem(item)} className='border-blue-600 text-blue-600 justify-between items-center'>
                {item}
              </Button>
            ))}
          </div>


        </div>
        <DialogFooter>
          <Button type="button" className='hidden' />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
