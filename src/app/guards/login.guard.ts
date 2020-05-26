import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api.service';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private _cookieService: CookieService, private _api: ApiService, private _router: Router) {
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(!this._cookieService.check(environment.atto_cookie)){
      this._router.navigate(['/']);
      return false;
    }
    
    const token = this._cookieService.get(environment.atto_cookie)
    return this._api.user.check_token().pipe(map((val) => {
      return true;
    },), catchError(error => {
    this._router.navigate(['/'])
     return of(false)
    }))
  }
  
}
