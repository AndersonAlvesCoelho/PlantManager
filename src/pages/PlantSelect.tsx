import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import api from '../services/api';

import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromenButton';
import { useNavigation } from '@react-navigation/core';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { PlantProps } from '../lib/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
    key: string;
    title: string;
}



export function PlantSelect() {
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelect, setEnvironmentSelect] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();

    function handleEnvironmentSelect(environment: string) {
        setEnvironmentSelect(environment);

        if (environment === 'all') return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        );
        setFilteredPlants(filtered);
    }

    async function fetchPlants() {
        const { data } = await api
            .get(`plants?_sort=name&orde=asc&_page=${page}&_limit=8`)

        if (!data) return setLoading(false);

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if (distance < 1) return;

        setLoadingMore(false);
        setPage(oldValue => oldValue + 1)
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api
                .get('plants_environments?_sort=title&orde=asc')
            setEnvironments([
                {
                    key: 'all',
                    title: 'todos'
                },
                ...data
            ]);
        }
        fetchEnviroment();
    }, []);

    useEffect(() => {
        fetchPlants();
    }, []);

    if (loading) return <Load />
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>Em qual ambiente </Text>
                <Text style={styles.subTitle}>você quer colocar sua planta? </Text>
            </View>

            <View>
                <FlatList
                    data={environments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.title}
                            active={item.key === environmentSelect}
                            onPress={() => handleEnvironmentSelect(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plnats}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.gray} /> : <></>}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 32
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subTitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plnats: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },

})