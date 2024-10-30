import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { HeartHandshakeIcon } from 'lucide-react-native'
import { Link } from 'expo-router'

type SpecialtiesCardProps = {
  data: {
    id: string
  name: string
  }
}

export default function SpecialtiesCard({ data }: SpecialtiesCardProps) {
  return (
    <Link href={`/(tabs)/home/doctors/${data.id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-[160px] bg-blue-600 p-4 gap-2 rounded-md justify-center items-center"
      >
        <HeartHandshakeIcon color={'#FFF'} />
        <Text className="text-white text-center text-sm">{data.name}</Text>
      </TouchableOpacity>
    </Link>
  )
}
