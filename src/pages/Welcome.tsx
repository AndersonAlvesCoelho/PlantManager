import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import watering from '../assets/watering.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';

export function Welcome() {
    return (
        <View style={style.container}>
            <Text style={style.title}>
                Gerencie {'\n'}
                suas plantas {'\n'}
                de forma fácil
            </Text>

            <Image source={watering} style={style.image} />

            <Text style={style.subTitle}>
                Não esqueça mais de regar suas plantas.
                Nós vuidamos de lembrar você sempre que precisar.
            </Text>

            <Button title=">"/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading

    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56

    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    },
    image: {
        width: 292,
        height: 284
    }
})