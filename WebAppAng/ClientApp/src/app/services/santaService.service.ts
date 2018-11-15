import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child } from "../Models/child.models";
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class SantaService {

  constructor(private _http: HttpClient) { }
  baseUrl: string = 'https://localhost:5001/api/children';
  
  getChildren(): Observable<Child[]>  {
    const url = `${this.baseUrl}`;
    return this._http.get<Child[]>(url)
      .pipe(
        map((data: Child[]) => data),
        catchError(this.handleError('getChildren', []))
      );
  }

  getChildById(id: number): Observable<Child> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.get(url)
      .pipe(
        map((data: Child) => data), 
        catchError(this.handleError<Child>('getChildById'))
      );
  }

  createChild(_child: Child): Observable<Child> {
    const url = `${this.baseUrl}`;
    return this._http.post<Child>(url, _child)
      .pipe(
        map((data: Child) => data),
        catchError(this.handleError<Child>('createChild'))
      );
  }

  updateChild(id, _child): Observable<Child> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.put(url, _child)
      .pipe(
        map((data: Child) => data),
        catchError(this.handleError<Child>('updateChild'))
      );
  }

  deleteChild(id: number): Observable<Child> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.delete<Child>(this.baseUrl + '/' + id)
      .pipe(
        map((data: Child)=>data),
        catchError(this.handleError<Child>('deleteChild'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}  
