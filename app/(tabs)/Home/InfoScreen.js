import { View, Text, Modal, Pressable, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MonthlyPaymentChart from '../../../components/MonthlyPaymentChart'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChartLine, Calendar, Percent, ChevronRight, Undo2, User, XCircle, Phone, LogOut, Scroll } from 'lucide-react-native'

const InfoScreen = () => {
    const insets = useSafeAreaInsets()
    const router = useRouter()
    const params = useLocalSearchParams()


    const handlePercentage = (total, remaining) => {
        return (remaining * 100) / total
    }


    const [modalVisible, setModalVisible] = useState(false);
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
                <Pressable onPress={() => {
                    setModalVisible(true);
                }}>
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
                                        <Text className="text-5xl font-bold">
                                            {history[history.length - 1]?.amount || '0'}
                                        </Text>
                                    </View>
                                </View>

                                {/* Contenedor para la fecha en la parte inferior */}
                                <View className="flex flex-row justify-between w-full">
                                    <Text className="text-sm font-bold text-black/30">{history[history.length - 1]?.date || 'No date'}</Text>
                                    {
                                        params.isPaid === 'true' ? (
                                            <Text className="text-sm font-bold text-[#6BB239]">Paid</Text>
                                        ) : (
                                            <Text className="text-sm font-bold text-red-500">Unpaid</Text>
                                        )
                                    }
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
                            <Pressable className="p-1 rounded-full bg-black" onPress={() => router?.push({
                                pathname: '/(tabs)/Home/HistoryScreen',
                                params: {
                                    history: JSON.stringify(history)
                                }
                            })}>
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
                                                <View className="flex flex-row items-end">
                                                    <Text className="text-sm font-bold text-black/30">$</Text>
                                                    <Text className="text-3xl font-bold text-[#000000]">{item.amount}</Text>

                                                </View>
                                                <Text className="text-xl font-bold text-black">{item.principal}</Text>
                                                <Text className="text-xl font-bold text-red-500">{item.interest}</Text>
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
            {/* user details modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View className="flex-1 justify-end items-center bg-black/50">
                    <View className="flex flex-col bg-white rounded-2xl p-5 w-full h-3/5">
                        <View className="flex flex-row justify-between">
                            <Text className="text-2xl font-bold text-[#6BB239]">User Details</Text>
                            <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                <XCircle size={24} color="#6BB239" strokeWidth={3} />
                            </Pressable>
                        </View>
                        <ScrollView>
                            <View className="flex flex-row items-center justify-start w-full mt-3 bg-white rounded-lg ">
                                {
                                    params.image ? (
                                        <Image
                                            source={{ uri: params.image }}
                                            style={{ width: 80, height: 80, borderRadius: 100 }}
                                        />
                                    ) : (
                                        <View className="flex items-center justify-center w-[100] h-[100] bg-black/10 rounded-full">
                                            <User size={48} color="black" strokeWidth={2} />
                                        </View>
                                    )
                                }
                                <View className=" ml-5">
                                    <Text className="text-xl font-black">{params.name}</Text>
                                    <Text className="text-sm font-bold text-black/30">{params.email}</Text>
                                </View>

                            </View>

                            <View className="mt-6 w-full">
                                <Text className="text-lg font-bold text-black/30">Configuration</Text>
                                <View className="flex flex-col items-center justify-center w-full mt-3 bg-[#F3F3F3] rounded-2xl p-3">
                                    <View className="flex flex-row items-center justify-between w-full p-3 border-b border-black/10">
                                        <View className="flex flex-row items-center">
                                            <View className="flex items-center justify-center w-10 h-10 bg-white rounded-xl">
                                                <Phone size={18} color="#6BB239" strokeWidth={3} />
                                            </View>
                                            <Text className="text-lg font-bold ml-4">Phone</Text>
                                        </View>
                                        <Text className="text-lg font-bold text-black/30">{params.phone}</Text>
                                    </View>

                                    <View className="flex flex-row items-center justify-between w-full p-3 border-b border-black/10">
                                        <View className="flex flex-row items-center">
                                            <View className="flex items-center justify-center w-10 h-10 bg-white rounded-xl">
                                                <ChartLine size={18} color="#6BB239" strokeWidth={3} />
                                            </View>
                                            <Text className="text-lg font-bold ml-4">Loan Amount</Text>
                                        </View>
                                        <Text className="text-lg font-bold text-black/30">{params.loanAmount}</Text>
                                    </View>

                                    {/* loan Amount */}
                                    <View className="flex flex-row items-center justify-between w-full p-3 border-b border-black/10">
                                        <View className="flex flex-row items-center">
                                            <View className="flex items-center justify-center w-10 h-10 bg-white rounded-xl">
                                                <Percent size={18} color="#6BB239" strokeWidth={3} />
                                            </View>
                                            <Text className="text-lg font-bold ml-4">Interest Rate</Text>
                                        </View>
                                        <Text className="text-lg font-bold text-black/30">{params.interestRate}</Text>
                                    </View>

                                    {/* loan Amount */}
                                    <View className="flex flex-row items-center justify-between w-full p-3 ">
                                        <View className="flex flex-row items-center">
                                            <View className="flex items-center justify-center w-10 h-10 bg-white rounded-xl">
                                                <Calendar size={18} color="#6BB239" strokeWidth={3} />
                                            </View>
                                            <Text className="text-lg font-bold ml-4">Payment Interval</Text>
                                        </View>
                                        <Text className="text-lg font-bold text-black/30">{params.paymentIntervalDays}</Text>
                                    </View>
                                </View>

                                {/* <View className="mt-6 w-full">
                                <Text className="text-lg font-bold text-black/30">Log Out</Text>
                                <Pressable className="flex flex-col items-center justify-center w-full mt-3 py-4 bg-red-500 rounded-2xl">
                                    <Text className="text-lg font-bold text-white">Log Out</Text>
                                </Pressable>
                            </View> */}

                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaProvider>
    )
}

export default InfoScreen