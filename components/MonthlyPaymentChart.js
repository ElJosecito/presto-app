import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
// fontawesome5 react native
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MonthlyPaymentChart = ({ fill, loanAmount, remaining }) => {
    const remainingFill = fill === 0 ? 100 : 93 - fill; // Porcentaje restante

    // Calcular la rotación de la flecha
    const minAngle = -145; // Ángulo inicial de la flecha
    const maxAngle = 63; // Ángulo final de la flecha (cuando fill es 100)
    const arrowRotation = minAngle + ((maxAngle - minAngle) * fill) / 100;

    const formatLoanAmount = (amount) => {
        if (amount >= 1000) {
            const formatted = amount / 1000;
            // Si el número es entero, quita los decimales; si no, mantén un decimal
            return `${Number.isInteger(formatted) ? formatted : formatted.toFixed(1)}k`;
        }
        return amount.toString();
    };

    const formatMoney = (amount) => {
        const num = Number(amount);
        return num.toLocaleString('en-US');
    };

    return (
        <View
            className=" flex items-center p-3"
            style={{
                backgroundColor: '#9AEF5E',
                borderRadius: 15,
                height: 280,
            }}
        >
            <Text style={styles.title}>Monthly Payment</Text>

            {/* Contenedor para ocultar la mitad inferior */}
            <View style={styles.circularProgressContainer} className="relative">
                {/* Círculo de fondo para el restante, rotación inversa */}
                <AnimatedCircularProgress
                    size={300}
                    width={27}
                    fill={remainingFill}
                    tintColor="#18181825" // Color del restante
                    backgroundColor="transparent" // Sin fondo
                    rotation={-90} // Rotación para llenar en sentido antihorario
                    arcSweepAngle={180} // Ángulo de 180 grados para hacerlo semicircular
                    lineCap="round"
                    style={{
                        transform: [{ scaleX: -1 }], // Reflejo en el eje X (horizontal)
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
                            { translateX: -30 }, // Centra la flecha horizontalmente
                            { rotate: `${arrowRotation}deg` }, // Aplica la rotación
                        ],
                        zIndex: 10
                    }}
                />


                {/* Círculo principal */}
                <AnimatedCircularProgress
                    size={300}
                    width={27}
                    fill={fill}
                    tintColor="#181818" // Color del progreso principal
                    backgroundColor="transparent" // Sin fondo
                    rotation={-90} // Para que el círculo sea semicircular
                    lineCap="round"
                    arcSweepAngle={180} // Ángulo de 180 grados para hacerlo semicircular
                    style={StyleSheet.absoluteFillObject} // Superpone el círculo principal
                />
            </View>

            {/* Flecha en el centro del gráfico */}
            {/* <FontAwesome
                name="location-arrow"
                size={30}
                color="black"
                style={{
                    position: 'absolute',
                    top: 175,
                    left: 165,
                    transform: [{ rotate: `${arrowRotation}deg` }], // Rotación de la flecha
                }}
            /> */}

            {/* Valores de cantidad y porcentaje en la parte inferior */}
            <View style={styles.bottomContainer}>
                <Text className="text-2xl font-bold">{`$${formatMoney(remaining)
                    }/${formatLoanAmount(loanAmount)
                    }`}</Text>
                <Text className="bg-[#181818] font-bold text-2xl">{fill}%</Text>
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
        height: 150, // Mitad de la altura del círculo para mostrar solo la parte superior
        overflow: 'hidden', // Oculta la mitad inferior
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
