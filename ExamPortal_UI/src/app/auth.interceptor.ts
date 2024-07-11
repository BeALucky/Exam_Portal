import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Request is on its way to ${req.url}")
  const authReq = req.clone({
    headers: req.headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`)
  })
  return next(authReq);
};
