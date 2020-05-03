import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TResponse, TUser } from '../models';

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
      return this.httpClient.post<TResponse<TUser>>("/signup", {email: email, password: password});
    },

    login: (email, password): Observable<TResponse<TUser>> => {
      return this.httpClient.post<TResponse<TUser>>("/login", {email: email, password: password});
    },

    delete: (): Observable<any> => {
      return this.httpClient.delete<any>("/delete");
    },

    update: (blob) => {
      return this.httpClient.put("/user", blob)
    }
  }

  public apikey = {
    create: () => {

    },

    delete: () => {

    },
    
    list: () => {

    }
  }
}

