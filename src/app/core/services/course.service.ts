import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Course } from 'src/app/models/course.module';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  public getCourses(): Observable<Course[]> {
    const courses: Course[] = [];
    for (let i = 1; i < 5; i++) {
      courses.push(new Course(i, `course-${i}`));
    }
    return of(courses);
  }
}
