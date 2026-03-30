/**
 * Converte qualquer erro em uma mensagem amigável para o usuário.
 */
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    // Erros de rede
    if (error.message.includes('Network request failed') || error.message.includes('fetch')) {
      return 'Sem conexão com a internet. Verifique sua rede e tente novamente.';
    }
    // Timeout
    if (error.message.includes('timeout') || error.message.includes('AbortError')) {
      return 'A requisição demorou muito. Tente novamente.';
    }
    // Erros HTTP conhecidos
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      return 'Sessão expirada. Faça login novamente.';
    }
    if (error.message.includes('403') || error.message.includes('Forbidden')) {
      return 'Você não tem permissão para realizar esta ação.';
    }
    if (error.message.includes('404') || error.message.includes('Not found')) {
      return 'Recurso não encontrado.';
    }
    if (error.message.includes('500') || error.message.includes('Internal Server')) {
      return 'Erro interno no servidor. Tente novamente mais tarde.';
    }
    return error.message;
  }

  if (typeof error === 'string') return error;

  return 'Ocorreu um erro inesperado. Tente novamente.';
}

/**
 * Registra erros com contexto para debug.
 * Preparado para integração futura com Sentry ou similar.
 */
export function logError(error: unknown, context?: string): void {
  const prefix = context ? `[${context}]` : '[Error]';

  if (__DEV__) {
    console.error(`${prefix}`, error);
  }

  // TODO: integrar com Sentry quando disponível
  // Sentry.captureException(error, { extra: { context } });
}
