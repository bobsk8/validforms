import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';


@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
