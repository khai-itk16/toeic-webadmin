import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { containAllBlankCharacter, MustMatch } from 'src/app/common/custom-validator-account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup

  constructor(private accountService: AccountService , 
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      fullName: ['', [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]]
  },{
    validators: MustMatch('password', 'confirmPassword')
  });
  }

  get profileFormControl() { return this.profileForm.controls; }


}
