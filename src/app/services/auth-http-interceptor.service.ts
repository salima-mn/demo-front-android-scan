import {forwardRef, Injectable} from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS,
} from '@angular/common/http';
//import {Observable} from "rxjs/Rx";
import {Router} from "@angular/router";
import {Observable, of, throwError} from 'rxjs';

@Injectable()
export class AuthHtppInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (sessionStorage.getItem('tokenJwt')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('tokenJwt')
        }
      })
    }
      return next.handle(req);
  }

}

