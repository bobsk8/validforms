import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from 'src/app/models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private count = 0;
  constructor() { }

  public getPersons(): Observable<Person[]> {
    const persons: Person[] = [];
    for (let i = 0; i < 10; i++) {
      this.count++;
      persons.push(new Person(this.count, `person-${this.count}`));
    }
    return of(persons);
  }

  public getNextPersons(page: number, pageSize: number = 10): Observable<Person[]> {
    const persons: Person[] = [];
    for (let i = 0; i < 10; i++) {
      this.count++;
      persons.push(new Person(this.count, `person-${this.count}`));
    }
    return of(persons);
  }

}
