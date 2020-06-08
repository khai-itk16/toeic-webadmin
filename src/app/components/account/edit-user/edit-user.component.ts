import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { containAllBlankCharacter, MustMatch, unselectOption } from 'src/app/common/custom-validator-account';
import { Account } from 'src/app/models/account';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private accountService: AccountService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }
 
  editAccountForm: FormGroup
  editAccount: Account
  accountAPI = { account_id: 0, username: '', full_name: '', email: '', role_id: 0 }
  changPass = false

  roles = [{ roleId: 1, role: 'admin' }, { roleId: 2, role: 'editor' }, { roleId: 3, role: 'user' }]

  ngOnInit(): void {
    this.editAccountForm = this.formBuilder.group({
      username: [this.accountAPI.username],
      fullName: [this.accountAPI.full_name],
      email: [this.accountAPI.email],
      roleID: [this.accountAPI.role_id]
    });
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.accountService.getAccountById(id).subscribe(
      res => {
        this.accountAPI = res.data
        console.log(this.accountAPI);
        this.editAccountForm = this.formBuilder.group({
          username: [this.accountAPI.username, [Validators.required,  Validators.maxLength(100), containAllBlankCharacter]],
          fullName: [this.accountAPI.full_name, [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
          email: [this.accountAPI.email, [Validators.required, Validators.maxLength(100), Validators.email]],
          roleID: [this.accountAPI.role_id, [unselectOption]]
        });
      },
      error => {
        console.log(error);      
      }
    );
  }


  get editAccountFormControl() { return this.editAccountForm.controls; }

  onEditUser() {
    this.editAccount = this.editAccountForm.value
    this.editAccount.id = this.accountAPI.account_id
    if ( this.editAccount != null) {
      console.log(this.editAccount)
      Swal.fire({
        title: 'Are you sure to update account',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, don\'t update it'
      }).then((result) => {
        if (result.value) { 
          this.accountService.updateAccount(this.editAccount).subscribe( 
            res => {
              console.log(res)
              this.router.navigate(["/user-management"])
                Swal.fire(
                  'Update!',
                  'Account has been updated.',
                  'success'
                )
            },
        error => {
          console.log(error)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Account isn\'t updated',
            'error'
          )
        }
      })
    }
  }

  onChangePass() {
    this.changPass = !this.changPass
    if (this.changPass == true) {
      this.editAccountForm.addControl('password', 
        this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(50), containAllBlankCharacter]));
    }
    if (this.changPass == false) {
      this.editAccountForm.removeControl('password');
    } 
  }
}
