import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import { useDoctorStore } from '@/src/stores/doctorStore'
import { useEffect, useState } from 'react'
import { ClockIcon } from 'lucide-react-native'
import colors from 'tailwindcss/colors'
import { TextInputMask } from 'react-native-masked-text'
import Calendar from '@/src/components/Calendar'
import type { DateData } from 'react-native-calendars'
import dayjs from 'dayjs'

export default function SelectDate() {
  const { doctorId } = useLocalSearchParams()
  const router = useRouter()

  const [date, setDate] = useState<DateData>()
  const [time, setTime] = useState('')

  const handleSelectDate = () => {
    router.push({
      pathname: '/appointments/select-time',
      params: { doctorId, date: date?.dateString },
    })
  }

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={'dark-content'} />
      <ScrollView className="">
        <View className="w-[335px] mx-auto mt-8 gap-4">
          <Text className="font-semibold">Dias da semana</Text>
          <TouchableOpacity className="p-3 rounded-md border border-blue-400">
            <Text className="text-lg font-semibold text-blue-800">Segunda</Text>
            <View className="flex-row gap-8 items-center">
              <Text>Inicio: 10h:30</Text>
              <Text>Fim: 16h:30</Text>
            </View>
          </TouchableOpacity>
          <View className="border border-zinc-200 my-4" />
          <Text className="font-semibold">Horário</Text>
          <View className="flex-row justify-between mt-2 items-center bg-zinc-200 h-12 px-4 rounded-md">
            <TextInputMask
              type="datetime"
              options={{
                format: 'HH:mm',
              }}
              style={{ flex: 1 }}
              placeholder={'Que horas?'}
              placeholderTextColor={'#666'}
              onChangeText={setTime}
              value={time ? time : 'Que horas?'}
            />
            <ClockIcon size={18} color={colors.zinc[600]} />
          </View>
          <TouchableOpacity
            onPress={handleSelectDate}
            className="bg-blue-600 h-12 rounded-md w-[335px] px-2 justify-center items-center"
          >
            <Text className="text-white">Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
