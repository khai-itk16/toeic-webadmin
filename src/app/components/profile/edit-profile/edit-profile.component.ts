import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { containAllBlankCharacter } from 'src/app/common/custom-validator-account';
import Swal from 'sweetalert2'
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
 
  profileForm: FormGroup
  editProfile: any
  profileAPI: any
  
  constructor(private profile: ProfileService,
    private dataTransferService: DataTransferService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataTransferService.getDataTranfer().subscribe(result => this.profileAPI = result)
    this.profileForm = this.formBuilder.group({
      username: [this.profileAPI.username, [Validators.required,  Validators.maxLength(100), containAllBlankCharacter]],
      firstName: [this.profileAPI.firstName, [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      lastName: [this.profileAPI.lastName, [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      email: [this.profileAPI.email, [Validators.required, Validators.maxLength(100), Validators.email]],
      phone: [this.profileAPI.phone, [Validators.required, Validators.maxLength(10)]]
    });
  }

  get profileFormControl() { return this.profileForm.controls; }

  onEditProfile() {
    this.editProfile = this.profileForm.value
    if (this.editProfile != null) {
      this.editProfile.accountId = this.profileAPI.accountId
      this.editProfile.status = this.profileAPI.status
      this.editProfile.roleEntities = this.profileAPI.roleEntities
      this.editProfile.vipAccount = this.profileAPI.vipAccount

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
          this.profile.updateProfile(this.editProfile).subscribe( 
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
