import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { PlantSave } from '../pages/PlantSave';

export interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    },
    dateTimeNotification: Date;
}


interface StoragePlantProps {
    [id: string]: {
        data: PlantProps;
    }
}

export async function savePlant(plant: PlantProps): Promise<void> {
    try {
        const data = await AsyncStorage.getItem('@plantmange:plants');
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant
            }
        }
        await AsyncStorage.setItem('@plantmange:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants,
            }));
    } catch (error) {
        throw new Error(error);
    }
}

export async function loadPlant(): Promise<PlantProps[]> {
    try {
        const data = await AsyncStorage.getItem('@plantmange:plants');
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        // return plants;
        const plantsSorted = Object
            .keys(plants)
            .map((plant) => {
                return {
                    ...plants[plant].data,
                    hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
                }
            })
            .sort((a, b) =>
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 100 -
                    Math.floor(new Date(b.dateTimeNotification).getTime() / 100)
                )
            )

        return plantsSorted;

    } catch (error) {
        throw new Error(error);
    }
}