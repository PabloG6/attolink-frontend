import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TResponse, TUser, TResponseList, TKey, TWhiteList, TPermission, TPlan, TServices, typeServiceMap, TProduct, TSubscription } from '../models';
import { tap, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private httpClient: HttpClient, private _cookieService: CookieService) { }

  /**
   * user namespace
   */

  private _plans: TPlan[] = [];
  private _user: BehaviorSubject<TUser> = new BehaviorSubject(null);

  get userInfo(): Observable<TUser> {
  
    return this._user.getValue() ? this._user.asObservable() : this.user.check_token().pipe(map(response => response.data));
  }

   getUser(): TUser {
    return this._user.getValue();
  }

   setUserInfo(user): void {
    this._user.next(user);

  }

   get plans() {
    return this._plans
  }
  public user = {
  
    /**
     * 
     */
    signup: (params): Observable<TResponse<TUser>> => {
      return this.httpClient.post<TResponse<TUser>>("signup", params);
    },

    login: (email, password): Observable<TResponse<TUser>> => {
      return this.httpClient.post<TResponse<TUser>>("login", {user: {email: email, password: password}});
    },

    delete: (): Observable<any> => {
      return this.httpClient.delete<any>("user/");
    },

    check_token: (): Observable<TResponse<TUser>> => {
      return this.httpClient.get<any>("auth/check_token", {}).pipe(tap((response) => {
        this._user.next(response.data);
      }));
    },

    update: (id, blob) => {
      return this.httpClient.put(`user/${id}`, blob);
    },

  }

  public email = {
    send_confirmation_email: (email) => {;
      return this.httpClient.post("confirm_email/", {email})
    },
    

    update_email: (email) => {
      return this.httpClient.post("confirm_email/update", email);
    },

    confirm_update_email: (id) => {
     return this.httpClient.put(`confirm_email/update/${id}`, {})
    }
  }

  public apikey = {
    create: (): Observable<TResponse<TKey>> => {
      return  this.httpClient.post<TResponse<TKey>>('keys', {})
    },

    delete: (id): Observable<any> => {
      return this.httpClient.delete(`keys/${id}`).pipe(tap(res => res));
      
    },
    

    
    list: (): Observable<TResponseList<TKey>> => {
      return this.httpClient.get<TResponseList<TKey>>("keys")

    }
  }

  public whitelist = {
    create: (ip_address: string, type: 'url' | 'ipv4' | 'ipv6'): Observable<TResponse<TWhiteList>> => {
      return this.httpClient.post<TResponse<TWhiteList>>('whitelist', {white_list: {ip_address: ip_address, type: type}})
    },

    list: (): Observable<TResponseList<TWhiteList>> => {
      return this.httpClient.get<TResponseList<TWhiteList>>('whitelist');
    },

    delete: (id): Observable<any> => {
      return this.httpClient.delete<any>(`whitelist/${id}`);
    }
  }


  public subscriptions = {
    list_plans: (): Observable<TResponseList<TPlan>> => {
      return this.httpClient.get<TResponseList<TPlan>>('v1/plans', ).pipe(tap((val => {
        this._plans = val.data;
      })))
    },

    create: (): void => {

    },

    update: (plans): Observable<TResponse<TSubscription>> => {
      return this.httpClient.put<TResponse<any>>('subscriptions', {subscriptions: plans})
    }
  }

  public permissions = {
    create: (permission_type: 'all' | 'restricted' | 'none'): Observable<TResponse<TPermission>> => {
      return this.httpClient.post<TResponse<TPermission>>('permissions', {permissions: {enable_whitelist: permission_type}})
    },

    get: (): Observable<TResponse<TPermission>> => {
      return this.httpClient.get<TResponse<TPermission>>('permissions');
    },

    update: (type: 'all' | 'restricted' | 'none'): Observable<TResponse<TPermission>> => {
      return this.httpClient.put<TResponse<TPermission>>('permissions', {permissions: {enable_whitelist: type}})
    }  
  }


  public password = {
    update: (blob: any) => {
      return this.httpClient.put('auth/password', blob);
    },

    create: (blob: any) => {
      return this.httpClient.post('auth/password/', blob);
    },

    forgot_password: (id, blob) => {
      return this.httpClient.post(`auth/password/${id}`, blob);

    },

  }
  makeProductList(planList: TPlan[]): TProduct[]  {
    const productsList: TProduct[] = []
    planList.forEach((plan) => {
      const val: TServices = typeServiceMap[plan.nickname]
      const tProduct: TProduct = [val, plan];
      
      productsList.push([val, plan]);
    });
    productsList.sort((a: TProduct, b: TProduct) => a[1].amount - b[1].amount)
    return productsList;
  }
}

