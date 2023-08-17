import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import React from 'react';
import { StatusBar } from 'react-native';
import { Loading } from './src/components/Loading';
import { SignUp } from './src/screens/SignUp';
import { theme } from './src/styles/theme';
import { NativeBaseProvider } from './src/utils/NativeBaseProvider';

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
      {!fontsLoaded ? <Loading /> : <SignUp />}
    </NativeBaseProvider>
  );
}
