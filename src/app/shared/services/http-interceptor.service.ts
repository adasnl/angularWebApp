import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  request: any;
  constructor(
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    this.request = request.clone({
      setHeaders: {
        ApiKey: `Y6jAaSXvMHpjRsDgTXacgqlTK3R3XfKf`,
      },
    });
    return next.handle(this.request);
  }
}
