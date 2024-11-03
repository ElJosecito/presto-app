import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const layout = () => {
  return (
    <Stack>
      <Stack.Screen name="Login" options={{
        headerShown: false
      }}/>
      <Stack.Screen name="LenderLogin" options={{
        headerShown: false
      }}/>
    </Stack>
  )
}

export default layout