// cache.interceptor.ts
import { Injectable, Inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(@Inject(CacheService) private cacheService: CacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request method is GET
    if (req.method !== 'GET') {
      // If not a GET request, proceed without caching
      return next.handle(req);
    }

    // Check if the request URL is cached
    const cachedResponse = this.cacheService.get(req.url);

    if (cachedResponse) {
      // If cached response exists, return it as an observable
      return of(new HttpResponse<any>({ body: cachedResponse }));
    }

    // If no cached response, proceed with the original request
    return next.handle(req).pipe(
      tap((event) => {
        // Check if the response event is an HTTP response
        if (event instanceof HttpResponse) {
          // Cache the response body
          this.cacheService.set(req.url, event.body);
        }
      })
    );
  }
}
