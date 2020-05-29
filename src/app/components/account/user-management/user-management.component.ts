import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  filter
  Accounts:[]

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(
      res => {
        this.Accounts = res.data.list
        console.log(this.Accounts)
      },
      error => {
        console.log(error);      
      }
    );
  }

  key: string = 'username'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  deleteAccount(id) {
    if(confirm("Are you sure to delete account")) {
      this.accountService.deleteAccount(id).subscribe (
        res => {
          setTimeout(() => {
            window.location.reload()
            console.log(res)
          }, 100);
          
      }, error => {
        console.log(error)
      })
    }
  }

  lockAccount(id) {
    if(confirm("Are you sure to lock account")) {
      this.accountService.lockAccount(id).subscribe (
        res => {
          setTimeout(() => {
            window.location.reload()
            console.log(res)
          }, 100);
          
      }, error => {
        console.log(error)
      })
    }
  }

  unlockAccount(id) {
    if(confirm("Are you sure to unlock account")) {
      this.accountService.unlockAccount(id).subscribe (
        res => {
          setTimeout(() => {
            window.location.reload()
            console.log(res)
          }, 100);
          
      }, error => {
        console.log(error)
      })
    }
  }
}
