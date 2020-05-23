import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { containAllBlankCharacter, MustMatch } from 'src/app/common/custom-validator-account';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  createAccountForm: FormGroup

  newAccount: Account

  roles = [{ roleId: 1, role: 'admin' }, { roleId: 2, role: 'mod' }, { roleId: 3, role: 'guest' }]

  constructor(private accountService: AccountService , 
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), containAllBlankCharacter]],
      fullName: ['', [Validators.required, Validators.minLength(4), containAllBlankCharacter]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), containAllBlankCharacter]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), containAllBlankCharacter]],
      roleId: ['']
  },{
    validators: MustMatch('password', 'confirmPassword')
  });
  }

  get createAccountFormControl() { return this.createAccountForm.controls; }

  onCreateNewUser() {
    this.newAccount = this.createAccountForm.value
    console.log(this.newAccount)
    if(this.newAccount != null) {  
      this.accountService.createAccount(this.newAccount).subscribe( 
        res => {
          console.log(res)
          this.router.navigate(["/user-management"])
          setTimeout(()=>{
            window.location.reload();
          }, 100);
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  onBack() {
    this.router.navigate(["/user-management"])
  }

}
