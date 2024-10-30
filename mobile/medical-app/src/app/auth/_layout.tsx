import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import { useAuthStore } from '@/src/stores/authStore'

export default function AuthLayout() {
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      return router.replace('/(tabs)/home')
    }
  }, [user])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="register/index" options={{ headerShown: false }} />
    </Stack>
  )
}
