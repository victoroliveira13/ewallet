import './global.css';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import AppRouter from './src/navigation/AppRouter';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style='light' backgroundColor='#0D0E18' />
      <NativeRouter>
        <AppRouter />
      </NativeRouter>
    </SafeAreaProvider>
  );
}
