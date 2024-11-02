import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

const UserScreen = () => {
    const insets = useSafeAreaInsets()

  return (
    <SafeAreaProvider>
    <View style={{paddingTop: insets.top, flex: 0}} />
    <View >
        <Text>UserScreen</Text>
    </View>
</SafeAreaProvider>
  )
}

export default UserScreen