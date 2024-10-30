import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { User2 } from 'lucide-react-native'
import { AppointmentStatus, type IAppointment } from '../types/appointment'

interface AppointmentCard {
  data: IAppointment
}

export function AppointmentCard({ data }: AppointmentCard) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="border border-zinc-300 px-6 py-4 rounded-md flex-row items-center justify-between gap-4"
    >
      <View>
        <Text className="font-semibold">Dr. Armando Matheus</Text>
        <Text className="text-sm">Ginecologia e obstetrícia</Text>
        <Text className="text-xs">Seg. Out, as 08h30</Text>
      </View>
      {data.status !== AppointmentStatus.CANCELED && (
        <TouchableOpacity className="bg-rose-600 h-10 justify-center items-center px-2 rounded-md">
          <Text className="text-white">Cancelar</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}
