import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Home, User, Plus } from 'lucide-react-native'

const layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarStyle: {
                backgroundColor: '#6BB239',
            }
        }}>
            <Tabs.Screen name="Home" options={{
                title: 'Home',
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, focused }) => <Home size={focused ? 30 : 24} color={color}  strokeWidth={focused ? 3 : 2}/>
            }} />
            <Tabs.Screen name="User" options={{
                title: 'User',
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, focused }) => <User size={focused ? 30 : 24} color={color} strokeWidth={focused ? 3 : 2} />
            }}
            />
        </Tabs>
    )
}

export default layout