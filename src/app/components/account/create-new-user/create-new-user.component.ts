import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
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

  newAccount: any

  roles = [{ roleId: 3, role: 'admin' }, { roleId: 2, role: 'censor' }, { roleId: 1, role: 'user' }]

  constructor(private accountService: AccountService , 
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      firstName: ['', [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      lastName: ['', [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
      roleId: ['', [unselectOption]],
      vipAccount: []
  },{
    validators: MustMatch('password', 'confirmPassword')
  });
  }

  get createAccountFormControl() { return this.createAccountForm.controls; }

  onCreateNewUser() {
    this.newAccount = this.createAccountForm.value
    this.newAccount.roleEntities = new Array()
    switch(this.newAccount.roleId) {
      case "3": 
        this.newAccount.roleEntities.push({
          roleId: 1,
          roleName: "ROLE_ADMIN"
        })
      case "2": 
        this.newAccount.roleEntities.push({
          roleId: 2,
          roleName: "ROLE_CENSOR"
        })
      case "1": 
        this.newAccount.roleEntities.push({
          roleId: 3,
          roleName: "ROLE_USER"
        })
    }
    
    delete this.newAccount.confirmPassword
    delete this.newAccount.roleId
    console.log(this.newAccount)
    if(this.newAccount != null) { 
      Swal.fire({
        title: 'Are you sure to create account',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, don\'t create it'
      }).then(result => {
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
        err => {
          console.log(err)
          Swal.fire(
            'Cancelled',
            'Account isn\'t created with error\n' + err.error.subErrors[0].message,
            'error'
          )
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
