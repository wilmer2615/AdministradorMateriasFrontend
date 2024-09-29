import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddCourseComponent } from '../add-course/add-course.component';
import { Student } from '../../models/student.model';
import { CourseService } from '../../services/course.service';
import { CoursesResult } from '../../models/coursesResult.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  account!: Student;
  name: string = '';
  coursesList: CoursesResult[] = [];
  creditsByStudent!: number;
  usedCredits!: number;
  private accountService = inject(AccountService);
  private courseService = inject(CourseService);
  private getAccountSubscription: Subscription | undefined;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAccount();
    this.getRegisteredCourses();
  }

  ngOnDestroy(): void {
    if (this.getAccountSubscription) {
      this.getAccountSubscription.unsubscribe();
    }
  }

  getAccount() {
    this.accountService.getAccount$.subscribe(resp => {
      if (resp) {
        this.account = resp;
        this.name = resp.name;
      }
    })
  }

  openModal() {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(AddCourseComponent, modalOptions);
    modalRef.componentInstance.account = this.account;
    modalRef.componentInstance.usedCredits = this.usedCredits;
    modalRef.componentInstance.creditsByStudent = this.creditsByStudent;

    modalRef.result.then((result) => {
      if (result) {
        this.getRegisteredCourses();
      }
    });
  }

  getRegisteredCourses() {
    this.courseService.getRegisteredCourses(this.account.id!).subscribe(resp => {
      if (resp) {
        this.coursesList = resp;
        this.usedCredits = resp.reduce((accumulator, course) => accumulator + course.credits, 0);
        console.log('creditos', this.usedCredits);
      }
    })
    this.courseService.getCreditsByStudent(this.account.id!).subscribe(resp => {
      this.creditsByStudent = resp.total;
    })
  }


}
