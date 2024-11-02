import { View, Text, TextInput, Image, Keyboard, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Eye, EyeOff } from 'lucide-react-native'
import { useRouter } from 'expo-router'

const Login = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

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
                <Text className="font-bold mb-2 ">Your email address</Text>
                <TextInput placeholder="Email" className="w-full px-6 py-2 h-14 rounded-2xl border border-black/25" />
              </View>

              <View className="w-full mb-4 relative">
                <Text className="font-bold mb-2 ">Password Here</Text>
                <TextInput placeholder="Password" className="w-full px-6 py-2 h-14 rounded-2xl border border-black/25" />
                <View className="absolute right-0 top-6 mr-4 mt-4">
                  {showPassword ? <EyeOff onPress={togglePassword} color="grey" /> : <Eye onPress={togglePassword} color="grey" />}
                </View>
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
                <Text className="mr-1">Are you a client?</Text>
                <Pressable onPress={()=>{
                  router.push('LenderLogin')
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

export default Login