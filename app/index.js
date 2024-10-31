import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'

const index = () => {
  
  const router = useRouter()

  return (
      <>
          <StatusBar style="auto" />
          <View className="flex flex-1 justify-center items-center bg-[#6BB239]">
              <Image source={require('../assets/Presto-Logo-White-Version.png')} />
              <Pressable onPress={() => router.push('/(auth)/Login')} className="rounded-full px-6 py-1 bg-white">
                  <Text className="text-[#6BB239] font-bold">Go to auth</Text>
              </Pressable>
          </View>
      </>
  )
}

export default index