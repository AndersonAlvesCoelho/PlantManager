import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { pt } from 'date-fns/locale';
import { formatDistance } from 'date-fns';

import { Header } from '../components/Header';
import { loadPlant, PlantProps } from '../lib/storage';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterdrop from '../assets/waterdrop.png'

export function MyPlant() {

    const [myPlants, setMyplants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();
            const nexTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWaterd(`Não esqueça de regar a ${plantsStoraged[0].name} à ${nexTime} horas`);
            setMyplants(plantsStoraged);
            setLoading(false);
        }
        loadStorageData();
    }, [])

    return (
        <View style={styles.continer}>
            <Header />

            <View style={styles.spotlight}>
                <Image source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWaterd}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                       <PlantCardSecondary data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',

    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify'
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    },
})