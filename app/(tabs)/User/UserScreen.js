import { View, Text, Image, ScrollView, Pressable, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { User, ChartLine, BellRing, LogOut, Sun, Moon, Earth } from 'lucide-react-native'

const UserScreen = () => {
  const insets = useSafeAreaInsets()

  const user = {
    name: "Javier",
    email: "javier@email.com",
    avatar: "https://avatars.githubusercontent.com/u/58600776?v=4",
    clients: 10,

  }


  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)


  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <ScrollView style={{ backgroundColor: "white", flex: 1, }}>
        <View className="flex flex-col p-3 ">
          <View className="flex flex-col items-center justify-center rounded-xl">
            <View className="flex flex-col items-center justify-center w-full h-full mt-3 bg-white rounded-lg ">
              {
                user.avatar ? (
                  <Image
                    source={{ uri: user.avatar }}
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                  />
                ) : (
                  <View className="flex items-center justify-center w-[100] h-[100] bg-black/10 rounded-full">
                    <User size={48} color="black" strokeWidth={2} />
                  </View>
                )
              }
              <Text className="text-lg font-bold">{user.name}</Text>
              <Text className="text-sm font-bold text-black/30">{user.email}</Text>

              <Pressable className="flex items-center justify-center p-3 px-6 mt-3 bg-black rounded-full">
                <Text className=" font-bold text-white">Edit Profile</Text>
              </Pressable>
              {/*  */}
              <View className="mt-6 flex flex-row justify-between w-full">
                <View className="flex-1"
                  style={{
                    borderRadius: 12,
                    backgroundColor: 'transparent',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    marginHorizontal: 2,
                  }}
                >
                  <View className="flex items-center justify-center p-3 bg-white rounded-2xl h-44">
                    {/* Clients count */}
                    <Text className="text-4xl font-bold text-[#000000]">{user.clients}</Text>
                    <Text className="text-sm font-bold text-black/30">Clients</Text>
                  </View>
                </View>
                <View className="flex-1"
                  style={{
                    borderRadius: 12,
                    backgroundColor: 'transparent',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    marginHorizontal: 2,
                  }}
                >
                  {/* next payment date */}
                  <Pressable className="flex items-center justify-center p-3 bg-white rounded-2xl h-44">
                    {/* Contenedor para el título en la parte superior */}
                    <ChartLine size={32} color="#6BB239" strokeWidth={3} />
                    <Text className="text-sm font-bold text-black/30">Charts</Text>

                  </Pressable>
                </View>
              </View>
              {/*  */}
              <View className="mt-6 w-full">
                <Text className="text-lg font-bold text-black/30">Configuration</Text>
                <View className="flex flex-col items-center justify-center w-full mt-3 bg-[#F3F3F3] rounded-2xl p-3">
                  <View className="flex flex-row items-center justify-between w-full p-3 border-b border-black/10">
                    <View className="flex flex-row items-center">
                      <View className="flex items-center justify-center w-10 h-10 bg-white rounded-xl">
                        <BellRing size={18} color="#6BB239" strokeWidth={3} />
                      </View>
                      <Text className="text-lg font-bold ml-4">Notifications</Text>
                    </View>
                    <Switch
                      trackColor={{ false: "#767577", true: "#6BB239" }}
                      thumbColor={notifications ? "#fff" : "#6BB239"}
                      ios_backgroundColor="#fff"
                      onValueChange={() => setNotifications(!notifications)}
                      value={notifications}
                    />
                  </View>
                  <View className="flex flex-row items-center justify-between w-full p-3 border-b border-black/10">
                    <View className="flex flex-row items-center">
                      <View className="flex items-center justify-center w-10 h-10 bg-white rounded-xl">
                        {darkMode ? <Moon size={18} color="#6BB239" strokeWidth={3} /> : <Sun size={18} color="#6BB239" strokeWidth={3} />}
                      </View>
                      <Text className="text-lg font-bold ml-4">Dark Mode</Text>
                    </View>
                    <Switch
                      trackColor={{ false: "#767577", true: "#6BB239" }}
                      thumbColor={darkMode ? "#fff" : "#6BB239"}
                      ios_backgroundColor="#fff"
                      onValueChange={() => setDarkMode(!darkMode)}
                      value={darkMode}
                    />
                  </View>
                  <View className="flex flex-row items-center justify-between w-full p-3 ">
                    <View className="flex flex-row items-center">
                      <View className="flex items-center justify-center w-10 h-10 bg-white rounded-xl">
                        <Earth size={18} color="#6BB239" strokeWidth={3} />
                      </View>
                      <Text className="text-lg font-bold ml-4">Language</Text>
                    </View>
                    <Text className="text-lg font-bold text-black/30">English</Text>
                  </View>
                </View>

                <View className="mt-6 w-full">
                  <Text className="text-lg font-bold text-black/30">Log Out</Text>
                  <View className="flex flex-col items-center justify-center w-full mt-3 bg-[#F3F3F3] rounded-2xl">

                    <View className={`flex flex-row items-end w-full p-3`}>
                      <Pressable className="flex flex-row justify-center items-center bg-red-600/20 rounded-full px-3"
                        onPress={() => console.log("Logout")}
                      >
                        <View className="flex items-center justify-center w-10 h-10  rounded-xl">
                          <LogOut size={18} color="red" strokeWidth={3} />
                        </View>
                        <Text className="text-lg font-bold text-red-500">Logout</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>

              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>

  )
}

export default UserScreen