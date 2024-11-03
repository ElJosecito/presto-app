import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Undo2, User } from 'lucide-react-native'
import { useRouter } from 'expo-router'

const layout = () => {
    const router = useRouter()
    return (
        <Stack>
            <Stack.Screen name="HomeScreen" options={{
                headerShown: false
            }} />
            <Stack.Screen name="InfoScreen"
                options={{
                    headerTitle: 'Info',
                    headerTitleStyle: {
                        color: '#6BB239'
                    },
                    headerStyle: {
                        backgroundColor: '#6BB239',

                    },
                    headerLeft: () => (
                        <Pressable onPress={() => router.back()}>
                            <Undo2 size={28} strokeWidth={3} color={"#fff"} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable onPress={() => router.navigate('/(tabs)/User/UserScreen')}>
                            <View className="p-2 bg-white rounded-full">
                                <User size={24} strokeWidth={3} color={"#6BB239"} />
                            </View>
                        </Pressable>
                    )
                }}
            />
        </Stack>
    )
}

export default layout