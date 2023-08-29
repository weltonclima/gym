import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import React from 'react';
import { StatusBar } from 'react-native';
import { Loading } from './src/components/Loading';
import { theme } from './src/styles/theme';
import { NativeBaseProvider } from './src/utils/NativeBaseProvider';

import { AuthProvider } from '@contexts/AuthContext';
import { Routes } from '@routes/index.routes';
import { queryClient } from '@services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_700Bold
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <AuthProvider>
          {!fontsLoaded ? <Loading /> : <Routes />}
        </AuthProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
