import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import React from 'react';
import { StatusBar } from 'react-native';
import { Loading } from './src/components/Loading';
import { theme } from './src/styles/theme';
import { NativeBaseProvider } from './src/utils/NativeBaseProvider';

import { Routes } from '@routes/index.routes';
import 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_700Bold
  });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {!fontsLoaded ? <Loading /> : <Routes />}
    </NativeBaseProvider>
  );
}
