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
                    headerTitle: "History",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        color: "white",
                        fontSize: 24,
                        fontWeight: "bold",
                    },
                    headerLeft: () => (
                        <Pressable onPress={() => router.back()}>
                            <Undo2 size={28} color={"white"} strokeWidth={3} />
                        </Pressable>
                    ),
                    headerLeftContainerStyle: { marginLeft: 16 },
                    // header Style
                    headerStyle: {
                        backgroundColor: "#6BB239",
                        shadowColor: "transparent",
                        elevation: 0,
                    },
                    
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