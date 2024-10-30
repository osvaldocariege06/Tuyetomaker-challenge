import { Slot, Stack } from 'expo-router'
import 'react-native-reanimated'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

import '../styles/global.css'
import { Splash } from '../components/Splash'
import { Redirect } from 'expo-router'

import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useAuthStore } from '../stores/authStore'

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Poppins-Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/poppins/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
  })

  const { user, loadUserFromToken } = useAuthStore()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
    loadUserFromToken() // Verifica o token ao iniciar o app
  }, [loaded, error])

  if (!loaded && !error) {
    return <Splash />
  }

  function RootLayoutNav() {
    return (
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Slot />
          {user ? (
            <Redirect href={'/(tabs)/home'} />
          ) : (
            <Redirect href={'/auth/login'} />
          )}
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    )
  }

  return RootLayoutNav()
}
