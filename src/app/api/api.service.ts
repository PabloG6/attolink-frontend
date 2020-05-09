import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TResponse, TUser, TResponseList, TKey } from '../models';

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

    delete: () => {

    },
    
    list: (): Observable<TResponseList<TKey>> => {
      return this.httpClient.get<TResponseList<TKey>>("/keys")

    }
  }
}

