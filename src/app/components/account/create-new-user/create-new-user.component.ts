import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { containAllBlankCharacter, MustMatch, unselectOption } from 'src/app/common/custom-validator-account';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  createAccountForm: FormGroup

  newAccount: Account

  roles = [{ roleId: 1, role: 'admin' }, { roleId: 2, role: 'editor' }, { roleId: 3, role: 'user' }]

  constructor(private accountService: AccountService , 
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      fullName: ['', [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
      roleId: ['', [unselectOption]]
  },{
    validators: MustMatch('password', 'confirmPassword')
  });
  }

  get createAccountFormControl() { return this.createAccountForm.controls; }

  onCreateNewUser() {
    this.newAccount = this.createAccountForm.value
    console.log(this.newAccount)
    if(this.newAccount != null) { 
      Swal.fire({
        title: 'Are you sure to create account',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, don\'t create it'
      }).then((result) => {
        if (result.value) { 
          this.accountService.createAccount(this.newAccount).subscribe( 
            res => {
              console.log(res)
              this.router.navigate(["/user-management"])
                Swal.fire(
                  'Created!',
                  'Account has been created.',
                  'success'
                )
            },
        error => {
          console.log(error)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Account isn\'t created',
          'error'
        )
      }
    })
    }
  }
}
