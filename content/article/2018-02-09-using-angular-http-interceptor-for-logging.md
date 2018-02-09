---
title: "Using Angular HTTP Interceptor for Logging"
url: "using-angular-http-interceptor-for-logging"
date: 2018-02-09T11:35:22+01:00
categories: ["Coding"]
tags: ["Angular"]
---

A thing we've found handy in the Angular application I'm currently working on, is the console logging of HTTP requests and 
responses. This makes it quick to determine if a problem exists in the Angular app or in the REST service we're calling 
(that we develop alongside the Angular app). Since logging it this way will show exactly which method is being called, 
the data being sent, headers and everything you need, there is no risk of mistaking one server interaction with another one.

The implementation below also includes a fix for GET calls using Internet Explorer, that sometimes seems to do some 
undesirable caching. By having this somewhat dirty code in an HTTP interceptor, we can at least keep it in one place and 
not have to think about it for every new HTTP GET call we add.

By the way, [you need to use Angular 4.3.4+ for this to work][2].

{{<highlight typescript>}}
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';

@Injectable()
export class LoggingHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);

    if (req.method === 'GET') {
      const time = new Date().getTime().toString();
      const dupReq = req.clone(
      {
        params: req.params.set('nocache', time)
      });

      return next.handle(dupReq).do((httpEvent: HttpEvent<any>) => this.logResponse(httpEvent));
    }

    return next.handle(req).do((httpEvent: HttpEvent<any>) => this.logResponse(httpEvent));
  }

  private logResponse(httpEvent: HttpEvent<any>): void {
    if (httpEvent instanceof HttpResponse) {
      console.log(httpEvent);
    }
  }
}

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoggingHttpInterceptor, multi: true }
    ]
})

export class HttpInterceptorModule { }
{{</highlight>}}


[1]: https://angular.io/guide/http#intercepting-all-requests-or-responses
[2]: https://stackoverflow.com/questions/44396890/angular-4-http-interceptor#answer-45658674
