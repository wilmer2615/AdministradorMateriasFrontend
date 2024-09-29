import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { environments } from '../environments/environments.dev';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }


  addRegisterStudent(student: Student){
    return this.http.post(environments.endPointStudent + environments.controllerStudent, student)
  }

  login(account: Account){
    return this.http.post(environments.endPointStudent + environments.controllerStudent + '/verify-account', account)
  }

  getStudentsByCourses(id: number):Observable<Student[]>{
    return this.http.get<Student[]>(`${environments.endPointStudent}${environments.controllerStudent}/students-by-course/${id}`);
  }
}
