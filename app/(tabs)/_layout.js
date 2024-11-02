import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Home, User } from 'lucide-react-native'

const layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: '#6BB239',
            }
        }}>
            <Tabs.Screen name="Home" options={{
                title: 'Home',
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => <Home size={24} color={color} />
            }} />
            <Tabs.Screen name="User" options={{
                title: 'User',
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => <User size={24} color={color} />
            }}
            />
        </Tabs>
    )
}

export default layout