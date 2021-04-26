import React from 'react';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

import Routes from './src/routes';
import { PlantProps } from './src/lib/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  // useEffect(() => {
  //   //ESPERANDO A NOTIFICAÇÃO CHEGAR, JUNTO COM SEU DATA
  //   // const subscription = Notifications.addNotificationReceivedListener(
  //   //   async notification => {
  //   //     const data = notification.request.content.data.plant as PlantProps;
  //   //     console.log('data', data);
  //   //   });

  //   //   return () => subscription.remove();

  //   // VISUALIZAR TODAS AS NOTIFICAÇÕES AGENDADAS
  //   // async function notification() {
  //   //   const data = await Notifications.getAllScheduledNotificationsAsync();
  //   //   console.log("--- NOFICIAÇÕES AGENDADAS ---");
  //   //   console.log('data', data);
  //   // }
  //   // notification();

  //   //CANCELAT TODAS AS NOTIFICAÇÕES AGENDADAS
  //   // async function notification() {
  //   //   await Notifications.cancelAllScheduledNotificationsAsync()
  //   // }
  //   // notification();

  // }, [])

  if (!fontsLoaded) return <AppLoading />

  return <Routes />;
}

