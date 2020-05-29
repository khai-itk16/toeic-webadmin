import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { containAllBlankCharacter, MustMatch, unselectOption } from 'src/app/common/custom-validator-account';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), containAllBlankCharacter]],
      fullName: ['', [Validators.required, Validators.minLength(4), containAllBlankCharacter]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), containAllBlankCharacter]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), containAllBlankCharacter]],
      roleId: ['', [unselectOption]]
  },{
    validators: MustMatch('password', 'confirmPassword')
  });
  }

  onCreateNewUser() {
    this.router.navigate(["/user-management"])
  }

  onBack() {
    this.router.navigate(["/user-management"])
  }

}
