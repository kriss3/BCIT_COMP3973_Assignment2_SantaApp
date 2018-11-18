import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child } from "../Models/child.models";
import { Observable } from 'rxjs';
import { User } from '../Models/user.models';
import { Router } from '@angular/router';

import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import { authToken } from '../Models/authToken.models';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SantaService {

  constructor(private _http: HttpClient, private _router: Router) { }
  baseUrl: string = 'https://localhost:5001/api/children';
  authBaseUrl: string = 'https://localhost:5001/api/auth';
  
  getChildren(): Observable<Child[]>  {
    const url = `${this.baseUrl}`;
    let authToken = sessionStorage.getItem('token') === null ? '' : sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', authToken);

    return this._http.get<Child[]>(url, { headers: headers })
      .pipe(
        map((data: Child[]) => data),
        catchError(this.handleError('getChildren', []))
      );
  }

  getChildById(id: number): Observable<Child> {
    const url = `${this.baseUrl}/${id}`;

    let authToken = sessionStorage.getItem('token') === null ? '' : sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', authToken);

    return this._http.get(url, { headers : headers})
      .pipe(
        map((data: Child) => data), 
        catchError(this.handleError<Child>('getChildById'))
      );
  }

  createChild(_child: Child): Observable<Child> {
    const url = `${this.baseUrl}`;
    let authToken = sessionStorage.getItem('token') === null ? '' : sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', authToken);

    return this._http.post<Child>(url, _child, {headers: headers})
      .pipe(
        map((data: Child) => data),
        catchError(this.handleError<Child>('createChild'))
      );
  }

  updateChild(id, _child): Observable<Child> {
    const url = `${this.baseUrl}/${id}`;

    let authToken = sessionStorage.getItem('token') === null ? '' : sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', authToken);

    return this._http.put(url, _child, {headers: headers})
      .pipe(
        map((data: Child) => data),
        catchError(this.handleError<Child>('updateChild'))
      );
  }

  deleteChild(id: number): Observable<Child> {
    const url = `${this.baseUrl}/${id}`;

    let authToken = sessionStorage.getItem('token') === null ? '' : sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', authToken);
   
    return this._http.delete<Child>(url, {headers: headers})
      .pipe(
        map((data: Child)=>data),
        catchError(this.handleError<Child>('deleteChild'))
      );
  }

  login(username: string, password: string) {

    return this._http.post<any>(`${this.authBaseUrl}/login`, { username: username, password: password }, httpOptions )
      .pipe(map(authToken => {
        // login successful if there's a jwt token in the response
        //if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
         
          //localStorage.setItem('currentUser', JSON.stringify(user));
        //}

        sessionStorage.setItem("username", username);
        let myToken = 'Bearer ' + authToken.token;
        sessionStorage.setItem("token", myToken);
        
        alert('New Token added to localStorage');
      }));
  }

  register(user: User) {
    return this._http.post(`${this.authBaseUrl}/register`, user);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
      if (error.status === 401) {
        alert('You are NOT Authorezed. Please, Log in.');
        this._router.navigate(['login']);
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}  
