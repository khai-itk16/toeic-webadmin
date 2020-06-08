import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { containAllBlankCharacter } from 'src/app/common/custom-validator-account';
import { Account } from 'src/app/models/account';
import Swal from 'sweetalert2'
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
 
  profileForm: FormGroup
  editProfile: Account
  profileAPI: any
  
  constructor(private accountService: AccountService,
    private dataTransferService: DataTransferService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataTransferService.getDataTranfer().subscribe(result => this.profileAPI = result)
    this.profileForm = this.formBuilder.group({
      username: [this.profileAPI.username, [Validators.required,  Validators.maxLength(100), containAllBlankCharacter]],
      fullName: [this.profileAPI.full_name, [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      email: [this.profileAPI.email, [Validators.required, Validators.maxLength(100), Validators.email]]
    });
  }

  get profileFormControl() { return this.profileForm.controls; }

  onEditProfile() {
    this.editProfile = this.profileForm.value
    this.editProfile.id = this.profileAPI.account_id
    if ( this.editProfile != null) {
      console.log(this.editProfile)
      Swal.fire({
        title: 'Are you sure to update profile',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, don\'t update it'
      }).then((result) => {
        if (result.value) { 
          this.accountService.updateAccount(this.editProfile).subscribe( 
            res => {
              console.log(res)
              this.router.navigate(["/profile"])
                Swal.fire(
                  'Update!',
                  'Profile has been updated.',
                  'success'
                )
            },
        error => {
          console.log(error)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Profile isn\'t updated',
            'error'
          )
        }
      })
    }
  }

}
