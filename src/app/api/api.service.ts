import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TResponse, TUser, TResponseList, TKey, TWhiteList, TPermission } from '../models';
import { tap } from 'rxjs/operators';
import { updateLocale } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  /**
   * user namespace
   */
  public user = {
  
    /**
     * 
     */
    signup: (email, password): Observable<TResponse<TUser>> => {
      return this.httpClient.post<TResponse<TUser>>("/signup", {user: {email: email, password: password}});
    },

    login: (email, password): Observable<TResponse<TUser>> => {
      return this.httpClient.post<TResponse<TUser>>("/login", {user: {email: email, password: password}});
    },

    delete: (): Observable<any> => {
      return this.httpClient.delete<any>("/delete");
    },

    check_token: (token): Observable<any> => {
      return this.httpClient.get<any>("/auth/check_token", {});
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

  public permissions = {
    create: (permission_type: 'all' | 'restricted' | 'none'): Observable<TResponse<TPermission>> => {
      return this.httpClient.post<TResponse<TPermission>>('/permissions', {permissions: {enable_whitelist: permission_type}})
    },

    get: (): Observable<TResponse<TPermission>> => {
      return this.httpClient.get<TResponse<TPermission>>('/permissions/show');
    },

    update: (type: 'all' | 'restricted' | 'none'): Observable<TResponse<TPermission>> => {
      return this.httpClient.put<TResponse<TPermission>>('/permissions', {permissions: {enable_whitelist: type}})
    }  
  }
}

