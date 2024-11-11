import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useRouter, Redirect } from 'expo-router'

const index = () => {

    const router = useRouter()


    return (
        <>
            <StatusBar style="light" />
            <View className="flex flex-1 justify-center items-center bg-[#6BB239]">
                <Image source={require('../assets/Presto-Logo-White-Version.png')}
                    style={{ width: 150, height: 150, marginBottom: 20 }} />
                <View className="w-full flex justify-center items-center">
                    {/* welcome back to presto */}
                    <View className="my-7">
                        <Text className="text-4xl font-black text-center text-white">Hello Again!</Text>
                        <Text className="text-white w-60 text-center px-4">Welcome back to Presto
                            You’ve been missed!</Text>
                    </View>

                    <View className="flex flex-row justify-center items-center w-full px-10">
                        <Pressable className="flex flex-row items-center justify-center w-full mt-5 p-3 bg-white rounded-full"
                            onPress={() => { router.replace('/(auth)/Login') }}
                        >
                            <Text className="text-lg font-bold text-[#6BB239]">Login as a User</Text>
                        </Pressable>
                    </View>


                    {/* divider */}

                    <View className="flex flex-row items-center justify-center w-full my-8">
                        <View className="w-2/5 border border-white/30"></View>
                        <Text className="mx-3 text-white">OR</Text>
                        <View className="w-2/5 border border-white/30"></View>
                    </View>


                    <View className="flex flex-row justify-center items-center w-full">
                        <Text className="mr-1 text-white">Are you a client?</Text>
                        <Pressable onPress={() => {
                            router.replace('/(auth)/LenderLogin')
                        }}>
                            <Text className="font-bold text-white">Login here</Text>
                        </Pressable>
                    </View>

                    {/* provisional btn for tabs screen */}
                    <Pressable onPress={() => { router.replace('/(tabs)/Home') }}>
                        <Text className="text-white">Go to Home</Text>
                    </Pressable>
                </View>
            </View>
        </>
    )
}

export default index