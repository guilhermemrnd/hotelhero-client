import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    let request = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const token = localStorage.getItem('access_token');
              request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
              });
              return next.handle(request);
            })
          );
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
