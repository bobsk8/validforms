import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  URL = environment.apiEndPoint;
  constructor(
    private http: HttpClient
  ) { }

  public getPersons(): Observable<any> {
    return this.http.get<any>(`${this.URL}/api/persons`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getNextPersons(page: number, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.URL}/api/persons?offset=${page}&limit=${limit}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error(error);
    return throwError(error);
  }

}
