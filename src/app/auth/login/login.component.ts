import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { StudentService } from '../../services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm!: FormGroup;
  private studentService = inject(StudentService);
  private accountService = inject(AccountService);

   constructor(private fb: FormBuilder, public router:Router) {
  
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }  

  login(){
    const account:Account = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.studentService.login(account).subscribe(resp =>{
      if(resp){
        this.accountService.setAccount(resp);
        Swal.fire({
          icon: "success",
          title: "Login exitoso"
        })
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      }else{
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas"
        })
      }
    })
  }

  onEmailInput() {
    const emailControl = this.loginForm.get('email');
    const emailValue = emailControl?.value;

    if (emailValue) {
      emailControl?.setValue(emailValue.toLowerCase(), { emitEvent: false });
    }
  }

}
