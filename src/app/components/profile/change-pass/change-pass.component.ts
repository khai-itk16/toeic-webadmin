import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { containAllBlankCharacter, MustMatch } from 'src/app/common/custom-validator-account';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ProfileService } from 'src/app/services/profile.service';

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
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]],
    },{
      validators: MustMatch('newPassword', 'confirmPassword')
    });
  }

  get profileFormControl() { return this.profileForm.controls; }

  onChangePassProfile(): void {
    this.newPass = this.profileForm.value
    console.log(this.newPass)
    if(this.newPass != null) { 
      Swal.fire({
        title: 'Are you sure to change profile password',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, change it!',
        cancelButtonText: 'No, don\'t change it'
      }).then(result => {
        if (result.value) { 
          this.profileService.changeProfilePass(this.newPass).subscribe( 
            res => {
              console.log(res)
              Swal.fire(
                'Change password!',
                'Profile has been changed password.',
                'success'
              )
              this.router.navigate(["/user-management"])
            },
        error => {
          console.log(error)
          Swal.fire(
            'Change password fail!',
            'Profile isn\'t change password',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Profile isn\'t change password',
            'error'
          )
        }
      })
    }
  }

}
