import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import {
  CalendarDaysIcon,
  Clock,
  Clock10Icon,
  User2,
} from 'lucide-react-native'
import colors from 'tailwindcss/colors'
import dayjs from 'dayjs'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import Calendar from '@/src/components/Calendar'
import { TextInputMask } from 'react-native-masked-text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import type { DateData } from 'react-native-calendars'

export default function AvailableTime() {
  const [selectedDay, setSelectedDay] = useState<DateData>()
  const [appointmentStartTime, setAppointmentStartTime] = useState('')

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  function onSubmit() {
    if (!setSelectedDay || !appointmentStartTime) {
      return Alert.alert(
        'Data/Horário',
        'Adicione quando e que horas deseja fazer a consulta'
      )
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-blue-600 h-[220p] py-8 justify-center items-center gap-4">
        <View className="w-24 h-24 py-6 justify-center items-center bg-zinc-100 rounded-full">
          <User2 size={42} color={colors.blue[600]} />
        </View>
        <Text className="text-zinc-50 text-center font-semibold">
          Dra. Nise da Silveira
        </Text>
      </View>
      <View className="flex-col justify-between items-center w-[335px] mx-auto flex-1 pb-4 h-full">
        <View className="flex-col">
          <View className="w-[335px] mx-auto mt-8 gap-3">
            <Text className="text-blue-600">Cirurgia Plástica</Text>
            <Text className="text-lg font-semibold text-zinc-600">
              Dra. Nise da Silveira
            </Text>
            <View className="flex-row gap-3 items-center">
              <CalendarDaysIcon color={colors.zinc[500]} size={16} />
              <Text className="text-sm text-zinc-500">
                {selectedDay
                  ? dayjs(selectedDay?.dateString).format('DD/MM/YYYY')
                  : 'Quando será?'}
              </Text>
            </View>
            <View className="flex-row gap-3 items-center">
              <Clock10Icon color={colors.zinc[500]} size={16} />
              <Text className="text-sm text-zinc-500">
                {appointmentStartTime ? appointmentStartTime : 'Que horas?'}
              </Text>
            </View>
          </View>
        </View>

        <View className="gap-2">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePresentModalPress}
            className="border border-blue-600 h-12 rounded-md w-[335px] px-2 justify-center items-center"
          >
            <Text className="text-blue-600">Escolhe a data para consulta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSubmit}
            className="bg-blue-600 h-12 rounded-md w-[335px] px-2 justify-center items-center"
          >
            <Text className="text-white">Confirmar reserva</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheetModal
        snapPoints={['90%']}
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
      >
        <BottomSheetView className="flex-1">
          <KeyboardAwareScrollView>
            <View className="px-4">
              <Calendar
                hideExtraDays
                onDayPress={date => setSelectedDay(date)}
                minDate={dayjs().toDate().toString()}
                theme={{
                  todayBackgroundColor: colors.blue[100],
                  selectedDayBackgroundColor: colors.blue[600],
                }}
              />
              <View className="border border-zinc-200 my-4" />
              <Text className="font-semibold">Horário</Text>
              <View className="flex-row justify-between mt-4 items-center bg-zinc-300 h-12 px-4 rounded-md">
                <TextInputMask
                  type="datetime"
                  options={{
                    format: 'HH:mm',
                  }}
                  style={{ flex: 1 }}
                  placeholder={'Que horas?'}
                  placeholderTextColor={'#666'}
                  onChangeText={setAppointmentStartTime}
                  value={
                    appointmentStartTime ? appointmentStartTime : 'Que horas?'
                  }
                />
                <Clock size={18} color={colors.zinc[600]} />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  )
}
