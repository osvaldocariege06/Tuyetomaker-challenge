import {
  CalendarDays,
  CalendarDaysIcon,
  ChevronDown,
  FilterIcon,
  FilterXIcon,
  SearchIcon,
  TextSearchIcon,
  User2,
  User2Icon,
} from 'lucide-react-native'
import {
  StatusBar,
  Image,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native'
import dayjs from 'dayjs'
import colors from 'tailwindcss/colors'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AppointmentCard } from '@/src/components/AppointmentCard'
import { useAppointmentStore } from '@/src/stores/appointmentStore'
import { useAuthStore } from '@/src/stores/authStore'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useDoctorStore } from '@/src/stores/doctorStore'
import Calendar from '@/src/components/Calendar'
import type { DateData } from 'react-native-calendars'

type ISelect = {
  id: string
  name: string
}

export default function TabOneScreen() {
  const { findAll, doctors, findAllSpecialty, specialty } = useDoctorStore()
  const { user } = useAuthStore()
  const {
    findUpcomingAppointments,
    findPastAppointments,
    findFilteredAppointments,
    appointments,
  } = useAppointmentStore()

  const [showFilterAppointments, setShowFilterAppointments] = useState(false)
  const [appointmentsToggle, setAppointmentsToggle] = useState<
    'past' | 'future'
  >('past')

  const [selectDate, setSelectedDate] = useState<DateData>()
  const [specialtyData, setSpecialtyData] = useState<ISelect>({
    id: '',
    name: '',
  })
  const [selectDoctor, setSelectDoctor] = useState<ISelect>({
    id: '',
    name: '',
  })

  // ref
  const doctorModalRef = useRef<BottomSheetModal>(null)

  // callbacks
  const handleDoctorModalPress = useCallback(() => {
    doctorModalRef.current?.present()
  }, [])

  const handleDoctorModalClose = useCallback(() => {
    doctorModalRef.current?.close()
  }, [])
  const handleShowDoctors = () => {
    findAll()
    handleDoctorModalPress()
  }

  // ref
  const specialtyModalRef = useRef<BottomSheetModal>(null)

  const handleSpecialtyModalPress = useCallback(() => {
    specialtyModalRef.current?.present()
  }, [])

  const handleSpecialtyModalClose = useCallback(() => {
    specialtyModalRef.current?.close()
  }, [])
  const handleShowSpecialtys = () => {
    findAllSpecialty()
    handleSpecialtyModalPress()
  }

  // ref
  const dateModalRef = useRef<BottomSheetModal>(null)

  // callbacks
  const handleDateModalPress = useCallback(() => {
    dateModalRef.current?.present()
  }, [])

  const loadPastAppointments = () => {
    if (!user) {
      return Alert.alert('Patient not found')
    }
    setAppointmentsToggle('past')
    findPastAppointments('3b718c55-ee8a-4894-93c5-71303fd98a11')
    console.log('Past', appointments)
  }

  const loadUpComingAppointments = () => {
    if (!user) {
      return Alert.alert('Patient not found')
    }
    setAppointmentsToggle('future')
    findUpcomingAppointments('3b718c55-ee8a-4894-93c5-71303fd98a11')
    console.log('Future', appointments)
  }

  const handleFilter = () => {
    console.log('Filter', appointments)
  }

  useEffect(() => {
    findFilteredAppointments({
      specialty: specialtyData.name,
      date: dayjs(selectDate?.dateString).toDate(),
      doctorId: selectDoctor.id,
    })
  }, [
    findFilteredAppointments,
    specialtyData?.name,
    selectDate?.dateString,
    selectDoctor.id,
  ])
  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={'dark-content'} />
      <ScrollView className="">
        <Text className="text-xl font-semibold text-center mt-6 text-blue-600">
          Minhas Reservas
        </Text>

        {/* BTN TOGGLES */}
        <View className="flex-row justify-around items-center mt-6 gap-4 bg-zinc-200 rounded-md p-3 w-[335px] mx-auto">
          <TouchableOpacity
            onPress={loadPastAppointments}
            className={`rounded-md h-11 justify-center items-center flex-1 ${appointmentsToggle === 'past' && 'bg-blue-600'}`}
          >
            <Text
              className={`text-sm ${appointmentsToggle === 'past' && 'text-white'}`}
            >
              Passados
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={loadUpComingAppointments}
            className={`rounded-md h-11 justify-center items-center flex-1 ${appointmentsToggle === 'future' && 'bg-blue-600'}`}
          >
            <Text
              className={`text-sm ${appointmentsToggle === 'future' && 'text-white'}`}
            >
              Futuros
            </Text>
          </TouchableOpacity>
        </View>

        {/* FILTERS */}
        {showFilterAppointments && (
          <View className="flex-col gap-4 mx-auto w-[335px] mt-8">
            <Text className="font-semibold">Filtrar</Text>

            <View className="flex-row justify-between items-center gap-4">
              <TouchableOpacity
                onPress={handleDateModalPress}
                className="h-11 px-4 rounded-md flex-row gap-2 border border-zinc-300 items-center justify-between"
              >
                <CalendarDaysIcon size={14} color={'#222'} />
                <Text className="text-sm">
                  {selectDate?.dateString || 'Escolha uma data'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleShowSpecialtys}
                className="h-11 px-4 rounded-md flex-row gap-2 border border-zinc-300 items-center justify-between"
              >
                <ChevronDown size={16} color={'#222'} />
                <Text className="text-sm">
                  {specialtyData.name || 'Especialidade'}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center gap-8">
              <TouchableOpacity
                className="bg-zinc-200 h-12 items-center flex-row rounded-md px-4 flex-1"
                onPress={handleShowDoctors}
              >
                <Text>{selectDoctor.name || 'Pesquisar por médicos'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-600 w-16 h-12 justify-center items-center flex-row rounded-md px-4"
                onPress={handleFilter}
              >
                <SearchIcon color={'#FFF'} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* APPOINTMENTS PAST */}
        {appointmentsToggle === 'past' && (
          <View className="w-[335px] mx-auto mt-8 gap-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold">
                Agendamentos Passados
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setShowFilterAppointments(!showFilterAppointments)
                }
                className={`border border-zinc-400 rounded-md p-2 ${showFilterAppointments && 'bg-blue-600'}`}
              >
                {showFilterAppointments ? (
                  <FilterXIcon size={16} color={'#FFF'} />
                ) : (
                  <FilterIcon size={16} color={'#222'} />
                )}
              </TouchableOpacity>
            </View>

            {appointments.length > 0 ? (
              <View>
                {appointments.map(appointment => (
                  <AppointmentCard key={appointment.id} data={appointment} />
                ))}
              </View>
            ) : (
              <Text className="text-center text-sm text-zinc-600">
                Nenhum agendamento passado
              </Text>
            )}
          </View>
        )}

        {/* APPOINTMENTS FUTURE */}
        {appointmentsToggle === 'future' && (
          <View className="w-[335px] mx-auto mt-8 gap-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold">
                Agendamentos Futuros
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setShowFilterAppointments(!showFilterAppointments)
                }
                className={`border border-zinc-400 rounded-md p-2 ${showFilterAppointments && 'bg-blue-600'}`}
              >
                {showFilterAppointments ? (
                  <FilterXIcon size={16} color={'#FFF'} />
                ) : (
                  <FilterIcon size={16} color={'#222'} />
                )}
              </TouchableOpacity>
            </View>

            {appointments.length > 0 ? (
              <View>
                {appointments.map(appointment => (
                  <AppointmentCard key={appointment.id} data={appointment} />
                ))}
              </View>
            ) : (
              <Text className="text-center text-sm text-zinc-600">
                Nenhum agendamento futuro
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      <BottomSheetModal snapPoints={['90%']} ref={doctorModalRef}>
        <BottomSheetView className="flex-1">
          <Text className="font-semibold text-lg mb-4 text-zinc-600 px-4">
            Pesquisar por médicos
          </Text>
          {doctors.map(doctor => (
            <TouchableOpacity
              key={doctor.id}
              onPress={() => {
                setSelectDoctor({ id: doctor.id, name: doctor.name })
                handleDoctorModalClose()
              }}
              activeOpacity={0.7}
              className="border border-zinc-300 px-6 py-4 rounded-md flex-row items-center gap-4"
            >
              <View className="w-12 h-12 bg-blue-600 justify-center items-center rounded-full">
                <User2Icon color={'#FFF'} />
              </View>
              <View>
                <Text className="font-semibold">{doctor.name}</Text>
                <Text className="text-sm">{doctor.email}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal snapPoints={['60%']} ref={dateModalRef}>
        <BottomSheetView className="flex-1">
          <Text className="font-semibold text-lg mb-4 text-zinc-600 px-4">
            Filtrar por data
          </Text>
          <View className="px-4">
            <Calendar
              hideExtraDays
              onDayPress={date => setSelectedDate(date)}
              minDate={dayjs().toDate().toString()}
              theme={{
                todayBackgroundColor: colors.blue[100],
                selectedDayBackgroundColor: colors.blue[600],
              }}
            />
            <View className="border border-zinc-200 my-4" />
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal snapPoints={['80%']} ref={specialtyModalRef}>
        <BottomSheetView className="flex-1">
          <Text className="font-semibold text-lg mb-4 text-zinc-600 px-4">
            Filtrar por especialidade
          </Text>
          <View className="px-4">
            {specialty.map(specialty => (
              <TouchableOpacity
                key={specialty.id}
                onPress={() => {
                  setSpecialtyData({ id: specialty.id, name: specialty.name })
                  handleSpecialtyModalClose()
                }}
                activeOpacity={0.7}
                className="border border-zinc-300 px-6 py-4 mb-2 rounded-md flex-row items-center gap-4"
              >
                <View>
                  <Text className="font-semibold">{specialty.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <View className="border border-zinc-200 my-4" />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  )
}
