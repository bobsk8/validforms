import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';


@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
