import { View, Text } from 'react-native'
import React,{useEffect, useState} from 'react'
import MonthlyPaymentChart from '../../../components/MonthlyPaymentChart'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

import { useLocalSearchParams, useRouter } from 'expo-router'
const InfoScreen = () => {
    const insets = useSafeAreaInsets()
    const router = useRouter()
    const params = useLocalSearchParams()


    const handlePercentage = (total, remaining) => {
        return (remaining * 100) / total
    }
    return (
        <SafeAreaProvider>
            <View className="flex-1 px-3">
                <MonthlyPaymentChart fill={handlePercentage(params.loanAmount, params.remainingBalance)} loanAmount={params.loanAmount} remaining={params.remainingBalance}/>
            </View>
        </SafeAreaProvider>
    )
}

export default InfoScreen