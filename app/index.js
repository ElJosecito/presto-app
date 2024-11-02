import { View, Text, Pressable, Image } from 'react-native'
import React, {useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import { useRouter, Redirect } from 'expo-router'

const index = () => {

  const router = useRouter()


  useEffect(() => {
    console.log('index.js')
  }, [])

  return (
      <>
          <StatusBar style="auto" />
          <View className="flex flex-1 justify-center items-center bg-[#6BB239]">
              <Image source={require('../assets/Presto-Logo-White-Version.png')} />
              <Pressable onPress={() => router.replace('/(auth)/Login')} className="rounded-full px-6 py-1 bg-white">
                  <Text className="text-[#6BB239] font-bold">Go to auth</Text>
              </Pressable>

              <Pressable onPress={() => router.replace('/(tabs)/Home')} className="rounded-full px-6 py-1 bg-white">
                  <Text className="text-[#6BB239] font-bold">Go to tabs</Text>
              </Pressable>
          </View>
      </>
  )
}

export default index