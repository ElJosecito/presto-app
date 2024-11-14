import { View, Text, Pressable, FlatList, ScrollView, Image, TextInput, Modal, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Plus, Search, X, Check, Key } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuthStore } from '../../../store/auth'
import { getUserById, addClient } from '../../../api/users'
import moment from 'moment'

const HomeScreen = () => {
    const insets = useSafeAreaInsets()
    const router = useRouter()
    
    // client data
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [cedula, setCedula] = useState('')
    const [loanAmount, setLoanAmount] = useState('')
    const [interest, setInterest] = useState('')
    const [paymentInterval, setPaymentInterval] = useState(7)


    const { user, token } = useAuthStore.getState()
    const [data, setData] = useState([])

    const formatMoney = (amount) => {
        const num = Number(amount);
        return num.toLocaleString('en-US');
    };

    const [modalVisible, setModalVisible] = useState(false);

    const handleModal = () => {
        setModalVisible(!modalVisible)
    }

    const handleFetchUser = async () => {
        const response = await getUserById(user.id)
        if (response.status === 200) {
            setData(response.data.user.clients)
        }
    }

    useEffect(() => {
        handleFetchUser()
    }, [data.clients])

    // format cedula
    const formatCedula = (cedula) => {
        // dominican republic cedula format
        const cedulaString = cedula.toString()
        return `${cedulaString.substring(0, 3)}-${cedulaString.substring(3, 10)}-${cedulaString.substring(10, 11)}`
    }

    // format phone number
    const formatPhoneNumber = (phoneNumber) => {
        const phoneNumberString = phoneNumber.toString()
        return `(${phoneNumberString.substring(0, 3)}) ${phoneNumberString.substring(3, 6)}-${phoneNumberString.substring(6, 10)}`
    }

    const handleAddClient = async () => {
        const client = {
            firstName,
            lastName,
            email,
            number: formatPhoneNumber(phoneNumber),
            identification: formatCedula(cedula),
            loanAmount: Number(loanAmount),
            interestRate: Number(interest),
            paymentInterval: Number(paymentInterval)
        }
        const response = await addClient(user.id, client)
        // console.log(response)
        if (response.status === 201) {
            handleFetchUser()
            setModalVisible(!modalVisible)
        }

    }

    return (
        <>
            <StatusBar style="dark" />
            <SafeAreaProvider>

                <View style={{ paddingTop: insets.top, flex: 0 }} />
                <View className="flex-1 px-2">
                    <View className="flex flex-row justify-between items-center p-3">
                        <Text className="text-3xl font-bold">Contacts</Text>
                        <Pressable className="rounded-full bg-[#6BB239] px-3 py-3"
                            onPress={handleModal}
                        >
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

                    {
                        data.length > 0 ? (
                            <FlatList
                                data={data}
                                style={{ flex: 1, paddingTop: 7, marginTop: 3 }}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item._id}
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => {
                                            router?.push({
                                                pathname: '/(tabs)/Home/InfoScreen',
                                                params: { ...item, history: JSON.stringify(item.paymentHistory) }
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
                                                    <Text className="font-bold capitalize text-lg">{`${item.firstName} ${item.lastName}`}</Text>
                                                    <Text className="text-sm text-gray-400/80">{item.number}</Text>
                                                </View>
                                                <View className="flex flex-col items-end">
                                                    <Text className="font-bold capitalize text-lg">${formatMoney(item.remainingBalance)}</Text>
                                                    <Text className="text-sm text-gray-400/80">{moment(item.nextPaymentDate).format("LL")}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Pressable>
                                )}
                            />
                        ) : (
                            <View className="flex flex-col items-center justify-center w-full h-1/2 p-3  ">
                                <Text className="text-lg font-bold">No contacts</Text>
                            </View>
                        )
                    }

                </View>
            </SafeAreaProvider>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <KeyboardAvoidingView behavior="padding" className="flex flex-1 justify-center w-full">
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                        nestedScrollEnabled={true}
                    >
                        <View className="flex-1 justify-end items-center bg-black/50">
                            <View className="bg-white w-full rounded-xl p-3 pb-10">
                                <View className="flex flex-row items-center justify-between">
                                    <Text className="text-3xl font-bold">Add Contact</Text>
                                    <Pressable onPress={handleModal}>
                                        <X color="black" />
                                    </Pressable>
                                </View>
                                <View className="flex flex-col items-center justify-center mt-3">
                                    <View className="w-full mb-4">
                                        <Text className="font-bold mb-2 ">First Name</Text>
                                        <TextInput placeholder="Name" className="w-full px-6 py-2 h-12 rounded-xl border border-black/25"
                                            onChangeText={setFirstName}
                                            value={firstName}
                                        />
                                    </View>
                                    <View className="w-full mb-4">
                                        <Text className="font-bold mb-2 ">Last Name</Text>
                                        <TextInput placeholder="Name" className="w-full px-6 py-2 h-12 rounded-xl border border-black/25"
                                            onChangeText={setLastName}
                                            value={lastName}
                                        />
                                    </View>
                                    <View className="w-full mb-4">
                                        <Text className="font-bold mb-2 ">Email</Text>
                                        <TextInput placeholder="Email" className="w-full px-6 py-2 h-12 rounded-xl border border-black/25"
                                            onChangeText={setEmail}
                                            value={email}
                                        />
                                    </View>
                                    <View className="w-full mb-4">
                                        <Text className="font-bold mb-2 ">Phone</Text>
                                        <TextInput placeholder="Phone" keyboardType='numeric' className="w-full px-6 py-2 h-12 rounded-xl border border-black/25"
                                            onChangeText={setPhoneNumber}
                                            value={phoneNumber}
                                        />
                                    </View>
                                    <View className="w-full mb-4">
                                        <Text className="font-bold mb-2 ">Cedula</Text>
                                        <TextInput placeholder="Phone" keyboardType='numeric' className="w-full px-6 py-2 h-12 rounded-xl border border-black/25"
                                            onChangeText={setCedula}
                                            value={cedula}
                                        />
                                    </View>
                                    <View className='w-full mb-4 flex flex-row justify-between gap-4'>
                                        <View className="w-1/2 mb-4">
                                            <Text className="font-bold mb-2 ">Loan Amount</Text>
                                            <TextInput placeholder="Loan Amount" keyboardType='numeric' className="w-full px-6 py-2 h-12 rounded-xl border border-black/25"
                                                onChangeText={setLoanAmount}
                                                value={loanAmount}
                                            />
                                        </View>
                                        <View className=" mb-4">
                                            <Text className="font-bold mb-2 ">Interest</Text>
                                            <TextInput placeholder="Interest Rate" keyboardType='numeric' className="w-full px-6 py-2 h-12 rounded-xl border border-black/25"
                                                onChangeText={setInterest}
                                                value={interest}
                                            />
                                        </View>
                                    </View>
                                    {/* Payment interval buttons horizontal list, week, month, etc */}
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        style={{ marginTop: 10 }}
                                        contentContainerStyle={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        <Pressable className="rounded-xl bg-[#6BB239] px-3 py-3 mr-3"
                                            onPress={() => setPaymentInterval(7)}
                                        >
                                            <Text className="text-white">Week</Text>
                                        </Pressable>
                                        <Pressable className="rounded-xl bg-[#6BB239] px-3 py-3 mr-3"
                                            onPress={() => setPaymentInterval(30)}
                                        >
                                            <Text className="text-white">Month</Text>
                                        </Pressable>
                                        <Pressable className="rounded-xl bg-[#6BB239] px-3 py-3 mr-3"
                                            onPress={() => setPaymentInterval(365)}
                                        >
                                            <Text className="text-white">Year</Text>
                                        </Pressable>
                                    </ScrollView>

                                    <Pressable
                                        onPress={handleAddClient}
                                        className="rounded-xl bg-[#6BB239] px-3 py-3 w-full mt-3"
                                    >
                                        <Text className="text-white text-center">Add</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                </KeyboardAvoidingView>
            </Modal>
        </>
    )
}

export default HomeScreen