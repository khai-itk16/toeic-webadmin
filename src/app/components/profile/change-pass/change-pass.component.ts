import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { containAllBlankCharacter, MustMatch } from 'src/app/common/custom-validator-account';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  profileForm: FormGroup
  newPass: any

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
    },{
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  get profileFormControl() { return this.profileForm.controls; }

  onChangePassProfile(): void {
    this.newPass = this.profileForm.value
    console.log(this.newPass)
    if(this.newPass != null) { 
      Swal.fire({
        title: 'Are you sure to create account',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, don\'t create it'
      }).then(result => {
        if (result.value) { 
        //   this.accountService.createAccount(this.newPass).subscribe( 
        //     res => {
        //       console.log(res)
        //       this.router.navigate(["/user-management"])
        //         Swal.fire(
        //           'Created!',
        //           'Account has been created.',
        //           'success'
        //         )
        //     },
        // error => {
        //   console.log(error)
        // })

        Swal.fire(
          'Created!',
          'Account has been created.',
          'success'
        )
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
