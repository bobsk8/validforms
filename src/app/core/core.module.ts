import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DataService } from './services/data.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService, { delay: 500 }),
  ]
})
export class CoreModule { }
