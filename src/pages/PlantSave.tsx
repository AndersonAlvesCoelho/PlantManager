import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePick, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { Button } from '../components/Button';
import { PlantProps, savePlant } from '../lib/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterdrop from '../assets/waterdrop.png'

interface Params {
    plant: PlantProps;
}

export function PlantSave() {

    const navigation = useNavigation();
    const route = useRoute();


    const { plant } = route.params as Params;

    const [selectdDateTime, setSelectdDateTime] = useState(new Date);
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldSate => !oldSate);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectdDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰')
        }

        if (dateTime) setSelectdDateTime(dateTime);
    }

    function handleOpenDatetimePickerForAndroid() {
        setShowDatePicker(oldSate => !oldSate);
    }

    async function handleSave() {

        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectdDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlant'
            });
        } catch {
            Alert.alert('Não foi possível sava. 😢')
        }
    }



    return (
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />
                <Text style={styles.plantName}>
                    {plant.name}
                </Text>
                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>
            </View>

            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>

                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrar:
                </Text>

                {showDatePicker && (
                    <DateTimePick
                        value={selectdDateTime}
                        mode='time'
                        display='spinner'
                        onChange={handleChangeTime}
                    />
                )}

                {Platform.OS === 'android' && (
                    <TouchableOpacity
                        style={styles.dateTimePickerButton}
                        onPress={handleOpenDatetimePickerForAndroid}
                    >
                        <Text style={styles.dateTimePickerText}>
                            {`Mudar ${format(selectdDateTime, 'HH:mm')}`}
                        </Text>
                    </TouchableOpacity>
                )}
                <Button
                    title="Cadastrar planta"
                    onPress={handleSave}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        backgroundColor: colors.shape
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 14,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 14,
        marginTop: 10
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },
})