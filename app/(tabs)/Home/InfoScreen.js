import { View, Text, FlatList, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MonthlyPaymentChart from '../../../components/MonthlyPaymentChart'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChartLine, Calendar, Percent, ChevronRight, Undo2, User } from 'lucide-react-native'
const InfoScreen = () => {
    const insets = useSafeAreaInsets()
    const router = useRouter()
    const params = useLocalSearchParams()


    const handlePercentage = (total, remaining) => {
        return (remaining * 100) / total
    }


    const [history, setHistory] = useState([]);

    useEffect(() => {
        try {
            // Decodifica history a un array de objetos
            const parsedHistory = JSON.parse(params.history);
            setHistory(parsedHistory);
            // console.log("Parsed History:", parsedHistory);
        } catch (error) {
            console.error("Error al parsear params.history:", error);
        }
    }, [params.history]);


    return (
        <SafeAreaProvider>
            <View style={{ paddingTop: insets.top }} />
            <View className="flex flex-row justify-between items-center px-5 pb-2 "
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
                <Pressable className="p-2 bg-white rounded-full" onPress={() => router.back()}>
                    <Undo2 size={28} strokeWidth={3} color={"#6BB239"} />
                </Pressable>
                <Pressable onPress={() => router.navigate('/(tabs)/User/UserScreen')}>
                    <View className="p-2 bg-white rounded-full">
                        <User size={24} strokeWidth={3} color={"#6BB239"} />
                    </View>
                </Pressable>
            </View>
            <ScrollView className="flex-1"
                nestedScrollEnabled={true}
            >
                <View className="flex-1 px-3">
                    <View className="pt-3">
                        <MonthlyPaymentChart fill={handlePercentage(params.loanAmount, params.remainingBalance)} loanAmount={params.loanAmount} remaining={params.remainingBalance} paymentInterval={Number(params.paymentIntervalDays)} />
                    </View>
                    <View className="pt-3 flex flex-row justify-between">
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
                            <View className="flex items-center p-3 bg-white rounded-2xl h-44">
                                {/* Contenedor para el título en la parte superior */}
                                <View className="flex flex-row justify-between w-full">
                                    <Text className="text-xl font-bold text-[#6BB239]">last Payment</Text>
                                    <ChartLine size={24} color="#6BB239" strokeWidth={3} />
                                </View>

                                {/* Separador para empujar la cantidad hacia el centro */}
                                <View className="flex-1 justify-center items-center">
                                    <View className="flex flex-row justify-end items-end">
                                        <Text className="text-xl">$</Text>
                                        <Text className="text-5xl font-medium">
                                            {history[history.length - 1]?.amount || '0'}
                                        </Text>
                                    </View>
                                </View>

                                {/* Contenedor para la fecha en la parte inferior */}
                                <View className="flex flex-row justify-between w-full">
                                    <Text className="text-sm font-bold text-black/30">{history[history.length - 1]?.date || 'No date'}</Text>
                                    <Text className={`text-sm font-bold ${params.isPaid ? "text-[#6BB239]" : ""}`}>Paid</Text>
                                </View>
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
                            <View className="flex items-center p-3 bg-white rounded-2xl h-44">
                                {/* Contenedor para el título en la parte superior */}
                                <View className="flex flex-row justify-between w-full">
                                    <Text className="text-xl font-bold text-red-500">Interest</Text>
                                    <Percent size={24} color="#ef4444" strokeWidth={3} />
                                </View>

                                {/* Separador para empujar la cantidad hacia el centro */}
                                <View className="flex-1 justify-center items-center">
                                    <View className="flex flex-row justify-center items-center">

                                        <Text className="text-5xl font-bold">
                                            {params.interestRate}
                                        </Text>
                                        <Percent size={28} color="#000" strokeWidth={3} />
                                    </View>
                                </View>

                                {/* Contenedor para la paymentIntervalDays, si es 30 sera igual a mensual, si es 7 sera igual a semanal, etc. */}
                                <View className="flex flex-row items-center w-full">
                                    {Number(params.paymentIntervalDays) === 7 ? (
                                        <Text className="text-sm font-bold text-black/30">Weekly</Text>
                                    ) : Number(params.paymentIntervalDays) === 15 ? (
                                        <Text className="text-sm font-bold text-black/30">Biweekly</Text>
                                    ) : Number(params.paymentIntervalDays) === 30 ? (
                                        <Text className="text-sm font-bold text-black/30">Monthly</Text>
                                    ) : Number(params.paymentIntervalDays) === 90 ? (
                                        <Text className="text-sm font-bold text-black/30">Quarterly</Text>
                                    ) : Number(params.paymentIntervalDays) === 120 ? (
                                        <Text className="text-sm font-bold text-black/30">Every 4 Months</Text>
                                    ) : Number(params.paymentIntervalDays) === 180 ? (
                                        <Text className="text-sm font-bold text-black/30">Every 6 Months</Text>
                                    ) : Number(params.paymentIntervalDays) === 365 ? (
                                        <Text className="text-sm font-bold text-black/30">Yearly</Text>
                                    ) : (
                                        <Text className="text-sm font-bold text-black/30">Custom Interval</Text>
                                    )}
                                </View>

                            </View>
                        </View>
                    </View>
                    {/* History */}
                    <View className="flex bg-[#FCE849] rounded-2xl mt-5 py-4 px-4 h-44">
                        <View className="flex flex-row justify-between ">
                            <Text className="text-xl font-bold text-black">History</Text>
                            <Pressable className="p-1 rounded-full bg-black" onPress={() => router.push('/(tabs)/Home/HistoryScreen', { history: JSON.stringify(history) })}>
                                <ChevronRight size={24} color="#fff" strokeWidth={3} />
                            </Pressable>
                        </View>
                        {
                            history.length > 0 ? (
                                <ScrollView 
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled={true}>
                                   {
                                    history.map((item, index) => (
                                        <View
                                        key={index}
                                        className="flex flex-row items-center justify-between border-b border-black/10 mt-2"
                                    >
                                        <Text className="text-3xl font-bold text-[#6BB239]">${item.amount}</Text>
                                        <Text className="text-xl font-bold text-black">{item.interest}</Text>
                                        <Text className="text-xl font-bold text-black">{item.principal}</Text>
                                        <Text className="text-sm font-bold text-black/30">{item.date}</Text>
                                    </View>
                                    ))
                                   }
                                </ScrollView>
                            ) : (
                                <View className="flex items-center justify-center">
                                    <Text className="text-lg font-bold text-black">No history</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default InfoScreen