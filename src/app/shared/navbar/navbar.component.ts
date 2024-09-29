import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  login:boolean = false;
  private accountService = inject(AccountService);
  private getAccountSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.getAccount();
  }

  ngOnDestroy(): void {
    if(this.getAccountSubscription){
  this.getAccountSubscription.unsubscribe();
    }
  }

  getAccount(){
    this.accountService.getAccount$.subscribe(resp =>{
      if(resp){
        this.login = true;
      }
    })
  }

}
