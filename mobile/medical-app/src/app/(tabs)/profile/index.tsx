import { useAuthStore } from '@/src/stores/authStore'
import {
  AtSignIcon,
  CalendarDaysIcon,
  FingerprintIcon,
  LockKeyholeIcon,
  LogOutIcon,
  PhoneIcon,
  User2,
} from 'lucide-react-native'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { View, Text } from 'react-native'
import colors from 'tailwindcss/colors'

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { TextInputMask } from 'react-native-masked-text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useCallback, useRef, useState } from 'react'
import zod from 'zod'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = zod
  .object({
    name: zod.string().min(3, { message: 'Nome é obrigatório' }).optional(),
    email: zod.string().email({ message: 'Email inválido' }).optional(),
    phone: zod
      .string()
      .min(9, { message: 'Telefone deve ter pelo menos 9 dígitos' })
      .optional(),
    birthDate: zod
      .string({ message: 'Insira uma data de nascimento' })
      .optional(),
    password: zod
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .optional(),
    confirmPassword: zod.string().min(6, 'Confirme a senha').optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  })

type FormData = zod.infer<typeof schema>

export default function Profile() {
  const { logout, user, updatePatient } = useAuthStore()

  const [isLoading, setIsLoading] = useState(false)

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      birthDate: '',
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<FormData> = async data => {
    setIsLoading(true)
    try {
      if (!user) return
      await updatePatient(user.id, data)
      setIsLoading(true)
      handleCloseModalPress()
    } finally {
      setIsLoading(false)
    }

    reset({
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
    })
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="p-8">
          <View className="flex-row justify-between items-center">
            <View className="w-12 h-12 justify-center items-center mt-6 bg-blue-600 rounded-full">
              <User2 size={20} color={'#FFF'} />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handlePresentModalPress}
            >
              <Text className="text-blue-600 font-semibold">Editar perfil</Text>
            </TouchableOpacity>
          </View>
          <View className="p-4 border border-zinc-400 rounded-md mt-6 flex-col gap-4">
            <Text className="text-zinc-600 text-lg font-semibold">
              Meu Perfil
            </Text>
            <View className="flex-row gap-2 items-center">
              <User2 color={colors.zinc[500]} size={20} />
              <Text className="text-zinc-500">{user?.name}</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <AtSignIcon color={colors.zinc[500]} size={20} />
              <Text className="text-zinc-500">
                {user?.email || 'Endereço de e-mail'}
              </Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <PhoneIcon color={colors.zinc[500]} size={20} />
              <Text className="text-zinc-500">
                {user?.phone || 'Número de telefone'}
              </Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <CalendarDaysIcon color={colors.zinc[500]} size={20} />
              <Text className="text-zinc-500">
                {user?.birthDate || 'Data de nascimento'}
              </Text>
            </View>
          </View>

          <View className="p-4 border border-zinc-400 rounded-md mt-6 flex-col gap-4">
            <Text className="text-zinc-600 text-lg font-semibold">
              Segurança
            </Text>
            <View className="flex-row gap-2 items-center">
              <LockKeyholeIcon color={colors.zinc[500]} size={20} />
              <Text className="text-zinc-500">*****</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <FingerprintIcon color={colors.zinc[500]} size={20} />
              <Text className="text-zinc-500">Desativado</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={logout}
            className="h-12 mt-8 justify-center items-center gap-2 flex-row bg-zinc-600 rounded-md"
          >
            <LogOutIcon color={colors.zinc[50]} size={20} />
            <Text className="text-zinc-50">Sair</Text>
          </TouchableOpacity>
        </View>

        <BottomSheetModal
          snapPoints={['90%']}
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView className="flex-1">
            <KeyboardAwareScrollView>
              <View className="px-4">
                <View className="border border-zinc-200 my-4" />
                <Text className="font-semibold">Editar Perfil</Text>
                <View className="mt-6 flex-col gap-4">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Nome completo"
                        keyboardType="default"
                        defaultValue={user?.name}
                        placeholderTextColor={colors.zinc[400]}
                        className={`bg-zinc-300  px-4 h-12 rounded-md ${errors.name && 'border border-pink-600'}`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="name"
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={colors.zinc[400]}
                        className={`bg-zinc-300  px-4 h-12 rounded-md ${errors.email && 'border border-pink-600'}`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="email"
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View
                        className={`bg-zinc-300 h-12 px-4 rounded-md ${errors.phone && 'border border-pink-600'}`}
                      >
                        <TextInputMask
                          type="cel-phone"
                          options={{
                            maskType: 'INTERNATIONAL',
                            dddMask: '(+244) ',
                          }}
                          placeholder="Telefone"
                          keyboardType="number-pad"
                          style={{ flex: 1 }}
                          placeholderTextColor={colors.zinc[400]}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </View>
                    )}
                    name="phone"
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View
                        className={`bg-zinc-300 h-12 px-4 rounded-md ${errors.birthDate && 'border border-pink-600'}`}
                      >
                        <TextInputMask
                          type="datetime"
                          options={{
                            format: 'DD-MM-YYYY',
                          }}
                          placeholder={'Data de nascimento (DD-MM-YYYY)'}
                          style={{ flex: 1 }}
                          placeholderTextColor={colors.zinc[400]}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </View>
                    )}
                    name="birthDate"
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Senha"
                        keyboardType="default"
                        secureTextEntry
                        placeholderTextColor={colors.zinc[400]}
                        className={`bg-zinc-300  px-4 h-12 rounded-md ${errors.password && 'border border-pink-600'}`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="password"
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Confirmar senha"
                        keyboardType="default"
                        secureTextEntry
                        placeholderTextColor={colors.zinc[400]}
                        className={`bg-zinc-300  px-4 h-12 rounded-md ${errors.confirmPassword && 'border border-pink-600'}`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="confirmPassword"
                  />

                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="h-12 mt-8 justify-center items-center gap-2 flex-row bg-zinc-600 rounded-md"
                  >
                    {isLoading ? (
                      <ActivityIndicator color={colors.white} />
                    ) : (
                      <Text className="text-zinc-50">Editar</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </ScrollView>
    </SafeAreaView>
  )
}
