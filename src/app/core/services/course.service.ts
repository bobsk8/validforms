import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Course } from 'src/app/models/course.module';
import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  URL = environment.apiEndPoint;
  constructor(
    private http: HttpClient
  ) { }

  public getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.URL}/api/courses`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error(error);
    return throwError(error);
  }
}
