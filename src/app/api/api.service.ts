import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TResponse, TUser, TResponseList, TKey, TWhiteList, TPermission, TPlan, TServices, typeServiceMap, TProduct } from '../models';
import { tap } from 'rxjs/operators';
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
  private _user: BehaviorSubject<TResponse<TUser>> = new BehaviorSubject(null);

  get userInfo(): Observable<TResponse<TUser>> {
  
    return this._user.getValue() ? this._user.asObservable() : this.user.check_token();
  }

   get plans() {
    return this._plans
  }
  public user = {
  
    /**
     * 
     */
    signup: (params): Observable<TResponse<TUser>> => {
      return this.httpClient.post<TResponse<TUser>>("/signup", params);
    },

  

    login: (email, password): Observable<TResponse<TUser>> => {
      return this.httpClient.post<TResponse<TUser>>("/login", {user: {email: email, password: password}});
    },

    delete: (): Observable<any> => {
      return this.httpClient.delete<any>("/delete");
    },

    check_token: (): Observable<any> => {
      return this.httpClient.get<any>("/auth/check_token", {}).pipe(tap((response) => {
        this._user.next(response);
      }));
    },

    update: (blob) => {
      return this.httpClient.put("/user", blob)
    }
  }

  public apikey = {
    create: (): Observable<TResponse<TKey>> => {
      return  this.httpClient.post<TResponse<TKey>>('/keys', {})
    },

    delete: (id): Observable<any> => {
      return this.httpClient.delete(`/keys/${id}`).pipe(tap(res =>  console.log(res)));
      
    },
    
    list: (): Observable<TResponseList<TKey>> => {
      return this.httpClient.get<TResponseList<TKey>>("/keys")

    }
  }

  public whitelist = {
    create: (ip_address: string, type: 'url' | 'ipv4' | 'ipv6'): Observable<TResponse<TWhiteList>> => {
      return this.httpClient.post<TResponse<TWhiteList>>('/whitelist', {white_list: {ip_address: ip_address, type: type}})
    },

    list: (): Observable<TResponseList<TWhiteList>> => {
      return this.httpClient.get<TResponseList<TWhiteList>>('/whitelist');
    },

    delete: (id): Observable<any> => {
      return this.httpClient.delete<any>(`/whitelist/${id}`);
    }
  }


  public subscriptions = {
    list_plans: (): Observable<TResponseList<TPlan>> => {
      return this.httpClient.get<TResponseList<TPlan>>('/v1/plans', ).pipe(tap((val => {
        this._plans = val.data;
      })))
    },

    create: (): void => {

    },

    update: (plans): Observable<TResponse<any>> => {
      return this.httpClient.put<TResponse<any>>('/subscriptions', {subscriptions: plans})
    }
  }

  public permissions = {
    create: (permission_type: 'all' | 'restricted' | 'none'): Observable<TResponse<TPermission>> => {
      return this.httpClient.post<TResponse<TPermission>>('/permissions', {permissions: {enable_whitelist: permission_type}})
    },

    get: (): Observable<TResponse<TPermission>> => {
      return this.httpClient.get<TResponse<TPermission>>('/permissions');
    },

    update: (type: 'all' | 'restricted' | 'none'): Observable<TResponse<TPermission>> => {
      return this.httpClient.put<TResponse<TPermission>>('/permissions', {permissions: {enable_whitelist: type}})
    }  
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

