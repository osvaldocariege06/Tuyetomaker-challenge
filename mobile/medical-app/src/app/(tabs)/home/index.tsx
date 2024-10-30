import { useAuthStore } from '@/src/stores/authStore'
import { useDoctorStore } from '@/src/stores/doctorStore'
import { router } from 'expo-router'
import { User2Icon } from 'lucide-react-native'
import { useEffect } from 'react'
import {
  StatusBar,
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

export default function Home() {
  const { user } = useAuthStore()
  const { findAll, doctors } = useDoctorStore()

  useEffect(() => {
    if (!user) {
      return router.replace('/auth/login')
    }

    findAll()
  }, [user, findAll])

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={'dark-content'} />
      <ScrollView className="">
        <Image
          source={require('../../../assets/images/logo-letters.png')}
          className="mt-10 mx-auto"
        />
        <Text className="text-sm text-center mt-3">
          Agende os seus serviços médicos
        </Text>

        {/* APPOINTMENTS FUTURE */}
        <View className="w-[335px] mx-auto mt-8 gap-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-semibold">Selecione um Médico</Text>
            <Text className="text-xs">Total ({doctors.length})</Text>
          </View>
          <View className="flex flex-row flex-wrap gap-3">
            {doctors.map(doctor => (
              <TouchableOpacity
                key={doctor.id}
                activeOpacity={0.7}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/home/doctors',
                    params: { doctorId: doctor.id },
                  })
                }
                className="w-[160px] border border-zinc-300 p-4 gap-2 rounded-md justify-center items-center"
              >
                <View className="w-12 h-12 justify-center items-center bg-blue-600 rounded-full">
                  <User2Icon size={20} color={'#FFF'} />
                </View>
                <Text className="text-blue-600 text-center text-sm">
                  {doctor.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
