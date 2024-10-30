import { View, Text } from 'react-native'
import React from 'react'
import {
  type CalendarProps,
  Calendar as RNCalendar,
} from 'react-native-calendars'

export default function Calendar({ ...rest }: CalendarProps) {
  return (
    <View>
      <RNCalendar {...rest} />
    </View>
  )
}
