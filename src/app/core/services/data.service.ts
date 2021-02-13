import { getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';

import { Course } from 'src/app/models/course.module';
import { Person } from 'src/app/models/person.model';

export class DataService implements InMemoryDbService {

  courses: Course[] = [];
  persons: Person[] = [];
  constructor() { }

  // https://github.com/angular/in-memory-web-api/blob/master/src/app/hero-in-mem-data-override.service.ts
  // override.service
  createDb(): {} | Observable<{}> | Promise<{}> {

    this.courses = [
      new Course(1, 'Java'), new Course(2, 'React'),
      new Course(3, 'Angular'), new Course(4, 'C#'),
      new Course(5, 'Nodejs'), new Course(6, 'Docker')
    ];
    this.persons = [
      new Person(1, 'Alberto', [new Course(1, 'Java'), new Course(2, 'React')]),
      new Person(2, 'Maria', [new Course(3, 'Angular'), new Course(1, 'Java')]),
      new Person(3, 'Francisco', [new Course(4, 'C#'), new Course(3, 'Angular')]),
      new Person(4, 'Luiz', [new Course(5, 'Nodejs'), new Course(1, 'Java')]),
      new Person(5, 'Lilian', [new Course(6, 'Docker'), new Course(3, 'Angular'), new Course(2, 'React')]),
      new Person(6, 'Maria', [new Course(1, 'Java'), new Course(2, 'React')]),
      new Person(7, 'Joana', [new Course(3, 'Angular'), new Course(1, 'Java')]),
      new Person(8, 'Carlos', [new Course(4, 'C#'), new Course(3, 'Angular')]),
      new Person(9, 'Leandro', [new Course(5, 'Nodejs'), new Course(1, 'Java')]),
      new Person(10, 'Bianca', [new Course(6, 'Docker'), new Course(3, 'Angular'), new Course(2, 'React')]),
      new Person(11, 'Berenice', [new Course(1, 'Java'), new Course(2, 'React')]),
      new Person(12, 'Thiago', [new Course(3, 'Angular'), new Course(1, 'Java')]),
      new Person(13, 'Bruna', [new Course(4, 'C#'), new Course(3, 'Angular')]),
      new Person(14, 'Felipa', [new Course(5, 'Nodejs'), new Course(1, 'Java')]),
      new Person(15, 'Samuel', [new Course(6, 'Docker'), new Course(3, 'Angular'), new Course(2, 'React')]),
      new Person(16, 'Laerte', [new Course(1, 'Java'), new Course(2, 'React')]),
      new Person(17, 'Wagner', [new Course(3, 'Angular'), new Course(1, 'Java')]),
      new Person(18, 'Lucas', [new Course(4, 'C#'), new Course(3, 'Angular')]),
      new Person(19, 'Marcio', [new Course(5, 'Nodejs'), new Course(1, 'Java')]),
      new Person(20, 'Aline', [new Course(1, 'Java'), new Course(2, 'React')]),
      new Person(21, 'Fernanda', [new Course(1, 'Java'), new Course(2, 'React')]),
      new Person(22, 'Rosana', [new Course(3, 'Angular'), new Course(1, 'Java')]),
      new Person(23, 'Rafael', [new Course(4, 'C#'), new Course(3, 'Angular')]),
      new Person(24, 'Ricardo', [new Course(5, 'Nodejs'), new Course(1, 'Java')]),
      new Person(25, 'Nilza', [new Course(6, 'Docker'), new Course(3, 'Angular'), new Course(2, 'React')]),
      new Person(26, 'Barbara', [new Course(1, 'Java'), new Course(2, 'React')]),
      new Person(27, 'Rodrigo', [new Course(3, 'Angular'), new Course(1, 'Java')]),
      new Person(28, 'Wanderley', [new Course(4, 'C#'), new Course(3, 'Angular')]),
      new Person(29, 'Chaves', [new Course(5, 'Nodejs'), new Course(1, 'Java')]),
      new Person(30, 'Kiko', [new Course(1, 'Java'), new Course(2, 'React')]),
    ];

    return { persons: this.persons, courses: this.courses };
  }

  get(reqInfo?: RequestInfo): Observable<any> {
    if (reqInfo?.collectionName?.includes('persons')) {
      if (!!reqInfo?.query.has('offset') && !!reqInfo.query.has('limit')) {
        const page: any = reqInfo.query.get('offset');
        const limit: any = reqInfo.query.has('limit');
        const persons = this.persons.slice(limit * (page - 1), limit * page);
        return this.getPersons(reqInfo, persons);
      } else {
        const page = 1;
        const limit = 10;
        const persons = this.persons.slice(limit * (page - 1), limit * page);
        return this.getPersons(reqInfo, persons);
      }
    }
    return of();
  }

  private getPersons(reqInfo: RequestInfo, data: any[]): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;

      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? { data } : data,
          status: STATUS.OK
        } :
        {
          body: { error: `'Persons' not found` },
          status: STATUS.NOT_FOUND
        };
      return this.finishOptions(options, reqInfo);
    });
  }

  /////////// helpers ///////////////

  private finishOptions(options: ResponseOptions, { headers, url }: RequestInfo): ResponseOptions {
    options.statusText = getStatusText(options.status || 0);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
