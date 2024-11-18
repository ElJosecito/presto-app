import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';

const MonthlyPaymentChart = ({ fill, loanAmount, remaining, paymentInterval }) => {
    const [remainingFill, setRemainingFill] = useState(0);

    useEffect(() => {
        const validRemainingFill = fill === 0 ? 100 : Math.round(93 - fill);

        setRemainingFill(validRemainingFill);

        console.log("Updated values:", { validRemainingFill, fill });
    }, [fill]); // Solo se ejecuta cuando cambia `fill`

    const arrowRotation = -145 + ((63 + 145) * fill) / 100;

    const formatLoanAmount = (amount) => {
        if (amount >= 1000) {
            const formatted = amount / 1000;
            return `${Number.isInteger(formatted) ? formatted : formatted?.toFixed(1)}k`;
        }
        return amount;
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
            <View className="flex flex-row items-start w-full px-3">
                <Text className="text-xl mb-4 font-bold">
                    {paymentInterval === 7 ? "Weekly" : "Custom Interval"}
                </Text>
            </View>

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
                            { translateX: -15 },
                            { rotate: `${arrowRotation}deg` },
                        ],
                        zIndex: 10,
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
                <Text className="text-2xl font-bold">{`$${Math.round(loanAmount - remaining).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}/ ${formatLoanAmount(loanAmount)}`}</Text>
                <Text className="bg-[#181818] font-bold text-2xl">{`${fill}%`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default MonthlyPaymentChart;


