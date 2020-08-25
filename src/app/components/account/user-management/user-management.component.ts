import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  Accounts: Array<any>
  statusCode: number

  filter
  key: string = 'username'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {

    this.accountService.getAccounts().subscribe(
      res => {
        this.Accounts = res
        console.log(res)
        this.statusCode = 200
      },
      error => {
        console.log(error);     
        this.statusCode = error.status 
      }
    );
  }

  deleteAccount(id) {
    Swal.fire({
      title: 'Are you sure delete account',
      // text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.accountService.deleteAccount(id).subscribe (
          res => {
            this.ngOnInit()
            Swal.fire(
              'Deleted!',
              'Account has been deleted.',
              'success'
            )
        }, error => {
          console.log(error)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Account is safe',
          'error'
        )
      }
    })
  }

  changeLockAccount(id) {
    Swal.fire({
      title: 'Are you sure to change state lock account',
      // text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, change state it!',
      cancelButtonText: 'No, don\'t change it'
    }).then((result) => {
      if (result.value) {
        this.accountService.changeLockAccount(id).subscribe (
          res => {
            this.ngOnInit()
            Swal.fire(
              'Changed!',
              'Account has been changed status.',
              'success'
            )
        }, error => {
          console.log(error)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Account isn\'t change',
          'error'
        )
      }
    })
  }
}
