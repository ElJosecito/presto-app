import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const layout = () => {
  return (
    <Stack>
        <Stack.Screen name="UserScreen" options={{
            headerShown: false
        }}/>
    </Stack>
  )
}

export default layout