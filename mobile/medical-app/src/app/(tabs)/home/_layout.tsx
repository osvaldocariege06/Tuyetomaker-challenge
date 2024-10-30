import React from 'react'
import { Stack, usePathname } from 'expo-router'
import { Text } from 'react-native'

export default function PagesLayout() {
  const pathname = usePathname()

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: 'Home' }}
      />
      <Stack.Screen
        name="doctors"
        options={{
          headerShown: true,
          title: '',
          headerRight: () => (
            <Text className="font-semibold">Data/Horário</Text>
          ),
        }}
      />
    </Stack>
  )
}
