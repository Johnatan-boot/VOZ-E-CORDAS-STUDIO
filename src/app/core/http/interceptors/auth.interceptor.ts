import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: Implementar lógica de token no futuro (Etapa de Autenticação)
  // const token = inject(AuthService).getToken();
  // if (token) {
  //   const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  //   return next(authReq);
  // }
  return next(req);
};
