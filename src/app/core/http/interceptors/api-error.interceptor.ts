import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiError } from '../errors/api-error';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let parsedError: ApiError;

      if (error.error instanceof ErrorEvent) {
        // Erro no client-side ou falha de rede antes de chegar no backend
        parsedError = new ApiError(0, {
          code: 'CLIENT_ERROR',
          message: 'Ocorreu um erro inesperado no aplicativo.'
        });
      } else if (error.status === 0) {
        // Servidor inacessível, offline, timeout ou erro de CORS
        parsedError = new ApiError(0, {
          code: 'NETWORK_ERROR',
          message: 'Servidor inacessível. Verifique sua conexão com a internet.'
        });
      } else {
        // O backend retornou um erro (4xx, 5xx). O Fastify devolve a estrutura { success: false, error: {...} }
        const backendError = error.error?.error;
        
        parsedError = new ApiError(error.status, {
          code: backendError?.code || `HTTP_${error.status}`,
          message: backendError?.message || getFallbackMessage(error.status),
          details: backendError?.details
        });
      }

      return throwError(() => parsedError);
    })
  );
};

function getFallbackMessage(status: number): string {
  if (status >= 400 && status < 500) {
    if (status === 401) return 'Não autorizado. Autentique-se novamente.';
    if (status === 403) return 'Você não tem permissão para acessar este recurso.';
    if (status === 404) return 'Recurso não encontrado.';
    if (status === 429) return 'Muitas requisições. Tente novamente mais tarde.';
    return 'Requisição inválida.';
  }
  if (status >= 500) {
    if (status === 503) return 'Serviço indisponível no momento.';
    return 'Ocorreu um erro interno no servidor.';
  }
  return 'Ocorreu um erro inesperado.';
}
