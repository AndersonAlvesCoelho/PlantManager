import React, { useState } from 'react';
import {
    KeyboardAvoidingView, // boa técnica de UX
    Platform, // boa técnica de UX
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableWithoutFeedback, // boa técnica de UX
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {

    const navigation = useNavigation();

    const [isFucused, setIsFucused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();


    function handleInputBlur() {
        setIsFucused(false);
    }

    function handleInputFocus() {
        setIsFucused(true);
    }

    function handleInputChanger(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit() {

        if (!name) return Alert.alert('Me diz como chamar você 😢');

        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subTitle: 'Agora vamos começar a cuida da suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        } catch {
            Alert.alert('Não foi possivel salvar sue nome 😢');
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFucused ? '😊' : '😃'}
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                chamar você?
                            </Text>
                            </View>

                            <TextInput
                                style={[
                                    styles.input,
                                    (isFucused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite seu nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChanger}
                            />

                            <View style={styles.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%',
    },
    header: {
        alignItems: 'center'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.text,
        marginTop: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    }
})