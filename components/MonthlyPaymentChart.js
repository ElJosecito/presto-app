import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MonthlyPaymentChart = ({ fill, loanAmount, remaining, paymentInterval }) => {
    const remainingFill = fill === 0 ? 100 : 93 - fill; // Porcentaje restante

    // Calcular la rotación de la flecha
    const minAngle = -145; // Ángulo inicial de la flecha
    const maxAngle = 63; // Ángulo final de la flecha (cuando fill es 100)
    const arrowRotation = minAngle + ((maxAngle - minAngle) * fill) / 100;

    const formatLoanAmount = (amount) => {
        if (amount >= 1000) {
            const formatted = amount / 1000;
            return `${Number.isInteger(formatted) ? formatted : formatted?.toFixed(1)}k`;
        }
        return amount?.toFixed(); // Mostrar siempre dos decimales en loanAmount
    };

    const formatMoney = (amount) => {
        const num = Number(amount);
        return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const formatPercentage = (percentage) => {
        return percentage?.toFixed(1); // Redondea el porcentaje a un decimal
    };

    return (
        <View
            className="flex items-center p-3"
            style={{
                backgroundColor: '#9AEF5E',
                borderRadius: 15,
                height: 280,
            }}
        >
            {paymentInterval === 7 ? (
                <View className="flex flex-row items-start w-full px-3">
                    <Text className="text-xl mb-4 font-bold">Weekly</Text>
                </View>
            ) : paymentInterval === 15 ? (
                <View className="flex flex-row items-start w-full px-3">
                    <Text className="text-xl mb-4 font-bold">Biweekly</Text>
                </View>
            ) : paymentInterval === 30 ? (
                <View className="flex flex-row items-start w-full px-3">
                    <Text className="text-xl mb-4 font-bold">Monthly</Text>
                </View>
            ) : paymentInterval === 90 ? (
                <View className="flex flex-row items-start w-full px-3">
                    <Text className="text-xl mb-4 font-bold">Every 3 Months</Text>
                </View>
            ) : paymentInterval === 120 ? (
                <View className="flex flex-row items-start w-full px-3">
                    <Text className="text-xl mb-4 font-bold">Every 4 Months</Text>
                </View>
            ) : paymentInterval === 180 ? (
                <View className="flex flex-row items-start w-full px-3">
                    <Text className="text-xl mb-4 font-bold">Every 6 Months</Text>
                </View>
            ) : paymentInterval === 365 ? (
                <View className="flex flex-row items-start w-full px-3">
                    <Text className="text-xl mb-4 font-bold">Yearly</Text>
                </View>
            ) : (
                <View className="flex flex-row items-start w-full px-3">
                    <Text className="text-xl mb-4 font-bold">Custom Interval</Text>
                </View>
            )}

            <View style={styles.circularProgressContainer} className="relative">
                <AnimatedCircularProgress
                    size={300}
                    width={27}
                    fill={remainingFill}
                    tintColor="#18181825"
                    backgroundColor="transparent"
                    rotation={-90}
                    arcSweepAngle={180}
                    lineCap="round"
                    style={{
                        transform: [{ scaleX: -1 }],
                        fontSize: 20,
                        color: 'blue',
                    }}
                />

                <FontAwesome
                    name="location-arrow"
                    size={30}
                    color="black"
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: [
                            { translateX: -30 },
                            { rotate: `${arrowRotation}deg` },
                        ],
                        zIndex: 10
                    }}
                />

                <AnimatedCircularProgress
                    size={300}
                    width={27}
                    fill={fill}
                    tintColor="#181818"
                    backgroundColor="transparent"
                    rotation={-90}
                    lineCap="round"
                    arcSweepAngle={180}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>

            <View style={styles.bottomContainer}>
                <Text className="text-2xl font-bold">{`$${formatMoney(loanAmount - remaining)}/${formatLoanAmount(loanAmount)}`}</Text>
                <Text className="bg-[#181818] font-bold text-2xl">{formatPercentage(fill)}%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    circularProgressContainer: {
        height: 150,
        overflow: 'hidden',
        alignItems: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        position: 'absolute',
        bottom: 20,
    },
    amount: {
        fontSize: 16,
    },
    percentage: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MonthlyPaymentChart;
