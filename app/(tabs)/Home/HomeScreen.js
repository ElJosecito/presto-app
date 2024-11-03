import { View, Text, Pressable, FlatList, ScrollView, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Plus, Search, X, Check } from 'lucide-react-native'
import { useRouter } from 'expo-router'

const HomeScreen = () => {
    const insets = useSafeAreaInsets()
    const router = useRouter()
    const data = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'John Doe',
            phone: '1234567890',
            loanAmount: 1000,
            remainingBalance: 500,
            dueDate: '2022-12-12',
            isPaid: false
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Jane Doe',
            phone: '1234567890',
            loanAmount: 1000,
            remainingBalance: 10,
            dueDate: '2022-12-12',
            isPaid: true
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'John Doe',
            phone: '1234567890',
            loanAmount: 1300,
            remainingBalance: 780,
            dueDate: '2022-12-12',
            isPaid: false
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Jane Doe',
            phone: '1234567890',
            loanAmount: 1000,
            remainingBalance: 600,
            dueDate: '2022-12-12',
            isPaid: true
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'John Doe',
            phone: '1234567890',
            loanAmount: 10000,
            remainingBalance: 10000,
            dueDate: '2022-12-12',
            isPaid: false
        },

    ]

    const formatMoney = (amount) => {
        const num = Number(amount);
        return num.toLocaleString('en-US');
    };

    return (
        <SafeAreaProvider>
            <View style={{ paddingTop: insets.top, flex: 0 }} />
            <View className="flex-1 px-2">
                <View className="flex flex-row justify-between items-center p-3">
                    <Text className="text-3xl font-bold">Contacts</Text>
                    <Pressable className="rounded-full bg-[#6BB239] px-3 py-3">
                        <Plus color="white" />
                    </Pressable>
                </View>
                <View className="flex flex-row justify-between items-center mt-3">
                    <View className="relative flex-1">
                        <View
                            // shadow
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
                            <TextInput placeholder="Search" className="w-full px-6  h-14 rounded-xl bg-white shadow-black" />
                        </View>
                        <View className="absolute right-0 top-[14] mr-4">
                            <Search color="#6BB239" strokeWidth={3} />
                        </View>
                    </View>
                </View>
                <FlatList
                    data={data}
                    style={{ flex: 1, paddingTop: 7, marginTop: 3 }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => {
                                router?.push({
                                    pathname: '/(tabs)/Home/InfoScreen',
                                    params: item
                                })
                            }}
                            // shadow
                            style={{
                                borderRadius: 16,
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
                            <View className="flex flex-row items-center justify-start p-3 w-full my-2 "
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 14,
                                    overflow: 'hidden',
                                }}

                            >
                                <View className="relative ">
                                    <Image source={{ uri: item.image }} className="w-14 h-14 rounded-full" />
                                    {
                                        item.isPaid ? (
                                            <View className="absolute right-0 bottom-0 bg-green-500 rounded-full p-1">
                                                <Check color="white" size={10} strokeWidth={4} />
                                            </View>
                                        ) : (
                                            <View className="absolute right-0 bottom-0 bg-red-500 rounded-full p-1">
                                                <X color="white" size={10} strokeWidth={4} />
                                            </View>
                                        )
                                    }

                                </View>
                                <View className="flex-1 flex-row justify-between items-start p-3 ">
                                    <View className="flex-shrink">
                                        <Text className="font-bold capitalize text-lg">{item.name}</Text>
                                        <Text className="text-sm text-gray-400/80">{item.phone}</Text>
                                    </View>
                                    <View className="flex-shrink">
                                        <Text className="font-bold capitalize text-lg">$ {formatMoney(item.remainingBalance)}</Text>
                                        <Text className="text-sm text-gray-400/80">{item.dueDate}</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )}
                />

            </View>
        </SafeAreaProvider>
    )
}

export default HomeScreen