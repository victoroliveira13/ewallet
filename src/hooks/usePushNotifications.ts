import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useNotificationStore } from '../store/useNotificationStore';
import { usePushTokenStore } from '../store/usePushTokenStore';

// Configura como notificações são exibidas quando o app está em foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    // Simulador não suporta push real — token fictício para dev
    return 'SIMULATOR_TOKEN';
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('ewallet', {
      name: 'E-Wallet',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#00D97E',
      sound: 'default',
      enableVibrate: true,
    });
  }

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: '081c24f3-9bdc-47e1-9d12-5585c42223b8',
  });

  return token.data;
}

// Mapeia o payload da notificação para a rota correta
function resolveRoute(data?: Record<string, unknown>): string {
  if (!data?.screen) return '/notifications';
  const routeMap: Record<string, string> = {
    home: '/home',
    notifications: '/notifications',
    history: '/history',
    send: '/send',
    receive: '/receive',
  };
  return routeMap[data.screen as string] ?? '/notifications';
}

export function usePushNotifications() {
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  const { setToken } = usePushTokenStore();

  const foregroundSub = useRef<Notifications.EventSubscription | null>(null);
  const responseSub = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    // Registrar dispositivo e salvar token
    registerForPushNotifications().then((token) => {
      if (token) {
        setToken(token);
        console.log('[Push] Token:', token);
      } else {
        console.warn('[Push] Permissão de notificação negada');
      }
    });

    // App em foreground: adiciona no store para exibir in-app
    foregroundSub.current = Notifications.addNotificationReceivedListener((notif) => {
      const { title, body, data } = notif.request.content;
      addNotification({
        title: title ?? 'Nova notificação',
        message: body ?? '',
        time: 'agora',
        type: (data?.notifType as 'transfer' | 'info' | 'alert') ?? 'info',
      });
    });

    // Usuário tocou na notificação: navega para a tela correta
    responseSub.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data as
        | Record<string, unknown>
        | undefined;
      navigate(resolveRoute(data));
    });

    return () => {
      foregroundSub.current?.remove();
      responseSub.current?.remove();
    };
  }, []);
}
