import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/models/course.module';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnDestroy {

  private subcription = new Subscription();
  public courses: Course[] = [];
  public personForm: FormGroup;
  public submitted = false;
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) {
    this.personForm = this.createPersonForm();
  }

  public ngOnInit(): void {
    this.getCourses();
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
    this.subcription = this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

  public ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
