import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourseComponent } from './add-course/add-course.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';



@NgModule({
  declarations: [
    AddCourseComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class PagesModule { }
