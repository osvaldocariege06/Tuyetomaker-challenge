import React from 'react'
import { Stack } from 'expo-router'
import { Text } from 'react-native'
import colors from 'tailwindcss/colors'

export default function PagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.blue[600] },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTintColor: '#FFF',
          headerShown: false,
          title: 'Horário',
          headerLargeTitleStyle: {},
        }}
      />
      {/* <Stack.Screen
        name="availableTime/index"
        options={{
          headerShown: true,
          title: '',
          headerRight: () => (
            <Text className="font-semibold text-white">Horário</Text>
          ),
        }}
      /> */}
    </Stack>
  )
}
