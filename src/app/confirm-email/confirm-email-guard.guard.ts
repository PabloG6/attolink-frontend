import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api/api.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailGuardGuard implements CanActivate {
   constructor(private _router: Router, private _api: ApiService) {

   }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      ("confirm email guard")
      const id = next.paramMap.get("id");
      this._api.user.confirm_email(id).pipe(map(val => true), catchError(error => {
        this._router.navigate(['/random-error'])
        return of(false);
      }))
      return true;
  }
  
}
