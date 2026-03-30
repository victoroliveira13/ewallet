import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { logError } from '../utils/errorHandling';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    logError(error, `ErrorBoundary › ${info.componentStack?.split('\n')[1]?.trim() ?? 'unknown'}`);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <View className='flex-1 bg-background items-center justify-center px-8'>
          <Text className='text-5xl mb-6'>⚠️</Text>
          <Text className='text-white text-xl font-bold text-center mb-3'>Algo deu errado</Text>
          <Text className='text-text-secondary text-sm text-center mb-8 leading-5'>
            O app encontrou um erro inesperado. Tente novamente ou reinicie o aplicativo.
          </Text>

          {__DEV__ && this.state.errorMessage ? (
            <View className='bg-surface rounded-xl px-4 py-3 w-full mb-6'>
              <Text className='text-danger text-xs font-mono' numberOfLines={4}>
                {this.state.errorMessage}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            className='bg-primary rounded-2xl px-8 py-4 w-full items-center'
            onPress={this.handleRetry}
            activeOpacity={0.8}
          >
            <Text className='text-background font-bold text-base'>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
