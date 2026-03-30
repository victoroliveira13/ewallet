import { usePushNotifications } from '../hooks/usePushNotifications';

/**
 * Componente sem UI que inicializa o suporte a push notifications.
 * Deve ser renderizado dentro do NativeRouter para ter acesso ao useNavigate.
 */
export function PushNotificationProvider() {
  usePushNotifications();
  return null;
}
