import React, { type RefObject, useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ChevronLeft } from 'lucide-react-native'

import { TextInputMask } from 'react-native-masked-text'

import Colors from 'tailwindcss/colors'
import { Link } from 'expo-router'
import { useAuthStore } from '@/src/stores/authStore'
import dayjs from 'dayjs'

const basicSchema = zod.object({
  name: zod.string().min(3, { message: 'Nome é obrigatório' }),
  email: zod.string().email({ message: 'Email inválido' }),
  phone: zod
    .string()
    .min(9, { message: 'Telefone deve ter pelo menos 9 dígitos' }),
  birthDate: zod.coerce.date({ message: 'Insira uma data de nascimento' }),
})

const secureSchema = zod
  .object({
    password: zod.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: zod.string().min(6, 'Confirme a senha'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  })

type FormData = zod.infer<typeof basicSchema> & zod.infer<typeof secureSchema>

export default function Register() {
  const { createPatient } = useAuthStore()
  const emailRef = useRef<TextInput | null>(null)

  const passwordRef = useRef<TextInput | null>(null)
  const confirmPasswordRef = useRef<TextInput | null>(null)

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<FormData>>({})

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(step === 1 ? basicSchema : secureSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleNextStep = async () => {
    const isStepOneValid = await trigger()
    if (isStepOneValid) {
      const currentData = getValues()
      setFormData(prev => ({ ...prev, ...currentData }))
      setStep(2)
    }
  }

  const onSubmit: SubmitHandler<FormData> = async data => {
    const finalData = { ...formData, ...data }
    setIsLoading(false)

    console.log()
    try {
      await createPatient({
        name: finalData.name,
        email: finalData.email,
        password: finalData.password,
        phone: finalData.phone,
        birthDate: dayjs('2000-01-01T22:24:02.152Z').toDate(),
      })
    } finally {
      setIsLoading(false)
    }

    // reset({
    //   name: '',
    //   email: '',
    //   phone: '',
    //   birthDate: '',
    //   password: '',
    //   confirmPassword: '',
    // })
  }

  const handleOnSubmitEditing = (ref: RefObject<TextInput>) => {
    if (ref?.current) {
      ref.current.focus() // Garante que `ref.current` não é null
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-col justify-between items-center pb-5">
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          className="flex-1"
          style={{ flex: 1 }}
        >
          <View className="flex-col items-center gap-24">
            <Image
              source={require('../../../assets/images/logo-letters.png')}
              className="mt-10"
            />
            {step === 1 && (
              <View className="flex-col gap-4 w-[280px]">
                <Text className="font-bold text-lg">Criar conta</Text>
                <View>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Nome completo"
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholderTextColor={Colors.zinc[400]}
                        className={`bg-zinc-300  px-4 h-12 rounded-md ${errors.name && 'border border-pink-600'}`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                        onSubmitEditing={() => handleOnSubmitEditing(emailRef)}
                      />
                    )}
                    name="name"
                  />
                  {errors.name && (
                    <Text className="text-xs text-pink-600">
                      {errors.name?.message}
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
                        ref={emailRef}
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={Colors.zinc[400]}
                        className={`bg-zinc-300  px-4 h-12 rounded-md ${errors.email && 'border border-pink-600'}`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                      />
                    )}
                    name="email"
                  />
                  {errors.email && (
                    <Text className="text-xs text-pink-600">
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
                      <TextInputMask
                        type="cel-phone"
                        options={{
                          maskType: 'INTERNATIONAL',
                          dddMask: '(+244) ',
                        }}
                        placeholder="(+244) 9xx xxx xxx"
                        placeholderTextColor={Colors.zinc[400]}
                        style={{
                          backgroundColor: Colors.zinc[300],
                          paddingHorizontal: 16,
                          borderRadius: 6,
                          height: 48,
                        }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="send"
                      />
                    )}
                    name="phone"
                  />
                  {errors.phone && (
                    <Text className="text-xs text-red-800">
                      {errors.phone?.message}
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
                      <TextInputMask
                        type={'datetime'}
                        options={{
                          format: 'DD-MM-YYYY',
                        }}
                        placeholder="DD-MM-YYYY"
                        placeholderTextColor={Colors.zinc[400]}
                        style={{
                          backgroundColor: Colors.zinc[300],
                          paddingHorizontal: 16,
                          borderRadius: 6,
                          height: 48,
                        }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={String(value)}
                        returnKeyType="send"
                        onSubmitEditing={() => setStep(2)}
                      />
                    )}
                    name="birthDate"
                  />
                  {errors.birthDate && (
                    <Text className="text-xs text-red-800">
                      {errors.birthDate?.message}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleNextStep}
                  className="bg-blue-600 h-12 rounded-md justify-center items-center"
                  activeOpacity={0.7}
                >
                  <Text className="text-zinc-100">Continuar</Text>
                </TouchableOpacity>
              </View>
            )}

            {step === 2 && (
              <View className="flex-col gap-4 w-[280px]">
                <TouchableOpacity
                  onPress={() => setStep(1)}
                  className="bg-blue-600 p-2 rounded-xl w-14 justify-center items-center"
                >
                  <ChevronLeft color={'#FFF'} />
                </TouchableOpacity>
                <Text className="font-bold text-lg">Segurança</Text>
                <View>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        ref={passwordRef}
                        placeholder="Senha"
                        keyboardType="visible-password"
                        secureTextEntry
                        placeholderTextColor={Colors.zinc[400]}
                        className={`bg-zinc-300  px-4 h-12 rounded-md ${errors.password && 'border border-pink-600'}`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          handleOnSubmitEditing(confirmPasswordRef)
                        }
                      />
                    )}
                    name="password"
                  />
                  {errors.password && (
                    <Text className="text-xs text-red-800">
                      {errors.password?.message}
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
                        ref={confirmPasswordRef}
                        placeholder="Confirmar senha"
                        keyboardType="default"
                        secureTextEntry
                        placeholderTextColor={Colors.zinc[400]}
                        className="bg-zinc-300  px-4 h-12 rounded-md"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                        onSubmitEditing={handleSubmit(onSubmit)}
                      />
                    )}
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && (
                    <Text className="text-xs text-red-800">
                      {errors.confirmPassword?.message}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className="bg-blue-600 h-12 rounded-md justify-center items-center disabled:opacity-40"
                  activeOpacity={0.7}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color={'#fff'} />
                  ) : (
                    <Text className="text-zinc-100">Criar conta</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        <Text className="text-sm">
          Já tenho conta.{' '}
          <Link href={'/auth/login'} className="text-blue-600">
            Fazer login
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  )
}
