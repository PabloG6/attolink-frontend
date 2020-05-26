import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private _cookieService: CookieService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        req = req.clone(

            {
                url: environment.rootUrl + req.urlWithParams,
            }
        );
        if (this._cookieService.check(environment.atto_cookie)) {
            const token = this._cookieService.get(environment.atto_cookie);

            req = req.clone({
                headers: req.headers.append('authorization', 'bearer: ' + token),
     
            });
        }



        return next.handle(req);
    }

}