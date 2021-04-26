import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { PlantSelect } from '../pages/PlantSelect';
import { MyPlant } from '../pages/MyPlant';

import colors from '../styles/colors';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'below-icon',
                style: {
                    paddingVertical: 20,
                    height: 88,
                    paddingBottom: 20
                }
            }}>
            <AppTab.Screen
                name="Nova plantas"
                component={PlantSelect}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="add-circle-outline"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <AppTab.Screen
                name="Minhas plantas"
                component={MyPlant}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </AppTab.Navigator>


    )
}

export default AuthRoutes;