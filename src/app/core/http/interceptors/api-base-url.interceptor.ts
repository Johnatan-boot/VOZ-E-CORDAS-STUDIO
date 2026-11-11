import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from '../api.token';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = inject(API_URL);

  // Se a requisição for para um caminho relativo que não comece com http
  // E também não comece com o apiUrl já configurado (para evitar duplicação)
  if (req.url.startsWith('/') && !req.url.startsWith(apiUrl)) {
    const apiReq = req.clone({ url: `${apiUrl}${req.url}` });
    return next(apiReq);
  }
  
  return next(req);
};
