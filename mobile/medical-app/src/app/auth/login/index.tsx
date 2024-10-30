import React, { type RefObject, useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native'

import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Colors from 'tailwindcss/colors'
import { Link, router } from 'expo-router'
import { useAuthStore } from '@/src/stores/authStore'

const schema = zod
  .object({
    email: zod.string().email('Insira um e-mail válido!'),
    password: zod.string().min(5, 'Senha deve ter no mínimo 6 caracteres'),
  })
  .required()

type FormLogin = zod.infer<typeof schema>

export default function Login() {
  const passwordRef = useRef<TextInput | null>(null)
  const { login, user } = useAuthStore()

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormLogin> = async data => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleOnSubmitEditing = (ref: RefObject<TextInput>) => {
    if (ref?.current) {
      ref.current.focus()
    }
  }

  useEffect(() => {
    if (user) {
      return router.replace('/(tabs)/home')
    }
  }, [user])

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-col justify-between items-center pb-5">
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          className="flex-1"
          style={{ flex: 1 }}
        >
          <View className="flex-col items-center gap-40">
            <Image
              source={require('../../../assets/images/logo-letters.png')}
              className="mt-10"
            />
            <View className="flex-col gap-4 w-[280px]">
              <Text className="font-bold text-lg">Entrar</Text>
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="E-mail"
                      keyboardType="email-address"
                      placeholderTextColor={Colors.zinc[400]}
                      className="bg-zinc-300  px-4 h-12 rounded-md"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      returnKeyType="next"
                      onSubmitEditing={() => handleOnSubmitEditing(passwordRef)}
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text className="text-xs text-red-800">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Senha"
                      ref={passwordRef}
                      placeholderTextColor={Colors.zinc[400]}
                      className="bg-zinc-300  px-4 h-12 rounded-md"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  )}
                  name="password"
                />
                {errors.email && (
                  <Text className="text-xs text-red-800">
                    {errors.password?.message}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="bg-blue-600 h-12 rounded-md justify-center items-center disabled:opacity-40"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={'#fff'} />
                ) : (
                  <Text className="text-zinc-100">Entrar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Text className="text-sm">
          Não tenho conta.{' '}
          <Link href={'/auth/register'} className="text-blue-600">
            Criar conta agora
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  )
}
