import React from 'react'
import { Stack } from 'expo-router'

export default function PagesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/home" options={{ headerShown: false }} />
    </Stack>
  )
}
