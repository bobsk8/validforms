import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CourseService } from 'src/app/core/services/course.service';
import { PersonService } from 'src/app/core/services/person.service';
import { Course } from 'src/app/models/course.module';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnDestroy {

  public count = 0;
  public page = 1;
  private subcription = new Subscription();
  public isLoading = false;
  public persons: Person[] = [];
  public courses: Course[] = [];
  public personForm: FormGroup;
  public submitted = false;
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private personService: PersonService
  ) {
    this.personForm = this.createPersonForm();
  }

  public ngOnInit(): void {
    this.getCourses();
    this.getPersons();
  }

  private createPersonForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      courses: this.fb.array([], Validators.required)
    });
  }

  onSubmit(form: any): void {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    const person = Object.assign(new Person(), form.value);
    console.log(person);
  }

  public onCheckboxChange(event: any): void {
    const courses: FormArray = this.personForm.get('courses') as FormArray;
    if (event.target.checked) {
      courses.push(new FormControl(event.target.value));
    } else {
      const index = courses.controls.findIndex(x => x.value === event.target.value);
      courses.removeAt(index);
    }
  }

  public getCourses(): void {
    const subcription = this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
    this.subcription.add(subcription);
  }

  public getPersons(): void {
    this.isLoading = true;
    const subcription = this.personService.getPersons()
      .subscribe(data => {
        this.persons = data.rows;
        this.count = data.count;
        this.isLoading = false;
      });
    this.subcription.add(subcription);
  }

  public nextPage(page: number): void {
    this.isLoading = true;
    const subcription = this.personService.getNextPersons(page)
      .subscribe(data => {
        this.persons = [...this.persons, ...data.rows];
        this.isLoading = false;
      });
    this.subcription.add(subcription);
  }

  public ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  public handler(index: any): void {
    if ((index + 6) === this.persons?.length &&
      this.persons?.length !== this.count) {
      this.page += 1;
      this.nextPage(this.page);
    }
  }

}
