import { View, Text, TextInput, Image, Keyboard, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const LenderLogin = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  return (
    <KeyboardAvoidingView behavior="padding" className="flex flex-1 justify-center w-full">
      <SafeAreaProvider style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View className="flex flex-1 items-center justify-center px-5">
            <View className="w-full flex items-center">
              <Image source={require('../../assets/Presto-Logo-Green.png')}
                className="w-64 h-64"
              />

              <View className="my-7">
                <Text className="text-4xl font-black text-center">Hello Again!</Text>
                <Text className="text-[#6BB239] w-60 text-center px-4">Welcome back to Presto
                  You’ve been missed!</Text>
              </View>

              <View className="w-full mb-4">
                <Text className="font-bold mb-2 ">Your Client code</Text>
                <TextInput placeholder="CLIENT-CODE-123456789" className="w-full px-6 py-2 h-14 rounded-2xl border border-black/25" />
              </View>


              <Pressable className="w-full bg-[#6BB239] rounded-2xl mb-4 h-14 flex justify-center">
                <Text className="text-white text-center font-bold">Login</Text>
              </Pressable>

              {/* divider */}

              <View className="flex flex-row items-center justify-center w-full my-5">
                <View className="w-2/5 border border-gray-500/30"></View>
                <Text className="mx-3 text-gray-500/30">OR</Text>
                <View className="w-2/5 border border-gray-500/30"></View>
              </View>


              <View className="flex flex-row justify-center items-center w-full">
                <Text className="mr-1">Are you a User?</Text>
                <Pressable onPress={()=>{
                  router.navigate('Login')
                }}>
                  <Text className="font-bold text-[#6BB239]">Login here</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaProvider>
    </KeyboardAvoidingView>
  )
}

export default LenderLogin