import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const HistoryScreen = () => {
  const router = useRouter()
  const params = useLocalSearchParams()
  const insets = useSafeAreaInsets()

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
    <>
    {/* <View style={{paddingTop: insets.top, backgroundColor:"white"}}/> */}
    <StatusBar style="light" />
    <View className="flex flex-col items-center justify-center p-3  bg-white" >
      <View className="flex flex-row items-center justify-between w-full p-3 border-b border-black/10 mt-10">
        <Text className="text-lg font-bold text-black">Amount</Text>
        <Text className="text-lg font-bold text-black">Principal</Text>
        <Text className="text-lg font-bold text-red-500">Interest</Text>
        <Text className="text-lg font-bold text-black">Date</Text>
      </View>
     {
      history.length > 0 ? (
        <View className="flex flex-col items-center justify-center rounded-xl ">
        <FlatList
          data={history}
          renderItem={({ item, index }) => (
            <View className={`flex flex-row items-center justify-between w-full p-3 border-b border-black/10 ${index % 2 === 0 ? 'bg-white' : 'bg-black/10'}`}
            >
              <View className="flex flex-row items-end my-3">
                  <Text className="text-sm font-bold text-black/30">$</Text>
                  <Text className="text-3xl font-bold text-[#000000]">{item.amount}</Text>

                </View>
                <Text className="text-xl font-bold text-black">{item.principal}</Text>
                <Text className="text-xl font-bold text-red-500">{item.interest}</Text>
                <Text className="text-sm font-bold text-black/30">{item.date}</Text>
            </View>
          )}
        />
      </View>
      ) : (
        <View className="flex flex-col items-center justify-center w-full h-full p-3 mt-3 bg-white rounded-lg ">
          <Text className="text-lg font-bold">No history</Text>
        </View>
      )}
    </View>
    </>
  )
}

export default HistoryScreen