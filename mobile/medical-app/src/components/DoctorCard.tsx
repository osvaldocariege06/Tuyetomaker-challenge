import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { User2 } from 'lucide-react-native'
import type { IDoctor } from '../types/doctor'

type DoctorCardProps = {
  data: IDoctor
}

export default function DoctorCard({ data }: DoctorCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-[160px] border border-zinc-300 p-4 gap-2 rounded-md justify-center items-center"
    >
      <View className="w-12 h-12 justify-center items-center bg-blue-600 rounded-full">
        <User2 size={20} color={'#FFF'} />
      </View>
      <Text className="text-blue-600 text-center text-sm">{data.name}</Text>
    </TouchableOpacity>
  )
}
