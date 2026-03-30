import './global.css';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import AppRouter from './src/navigation/AppRouter';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { useAuthStore } from './src/store/useAuthStore';

function AppEntry() {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <NativeRouter>
      <AppRouter />
    </NativeRouter>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style='light' backgroundColor='#0D0E18' />
      <ErrorBoundary>
        <AppEntry />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
