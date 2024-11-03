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
            <Stack.Screen name="HistoryScreen"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="InfoScreen"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    )
}

export default layout