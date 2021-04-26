import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    title: string;
    subTitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;

}

const emojis = {
    hug: '🤗',
    smile: '😄'
}

export function Confirmation() {

    const navigation = useNavigation();
    const route = useRoute();

    const  {
        title,
        subTitle,
        buttonTitle,
        icon,
        nextScreen,
    } = route.params as Params;

    function handleSubmit() {
        navigation.navigate(nextScreen)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>{emojis[icon]}</Text>

                <Text style={styles.title}>{title}</Text>

                <Text style={styles.subTitle}>{subTitle}</Text>

                <View style={styles.footer}>
                    <Button
                        onPress={handleSubmit}
                        title={buttonTitle}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    emoji: {
        fontSize: 78,
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.text,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,
    },
    subTitle: {
        fontFamily: fonts.heading,
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 10,
        color: colors.heading
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    },
})