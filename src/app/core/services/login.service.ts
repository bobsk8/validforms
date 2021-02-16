import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
export class LoginService {

  URL = environment.apiEndPoint;
  constructor(
    private http: HttpClient
  ) { }

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.URL}/auth`, { username, password }, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error(error);
    return throwError(error);
  }
}
