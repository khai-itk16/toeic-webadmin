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
  account = { account_id: 0 , username: '', full_name: '', email:'', role_id: 0 };
  changPass = false

  roles = [{ roleId: 1, role: 'admin' }, { roleId: 2, role: 'editor' }, { roleId: 3, role: 'user' }]

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.accountService.getAccountById(id).subscribe(
      res => {
        this.account = res.data
        console.log(this.account);
      },
      error => {
        console.log(error);      
      }
    );

    this.editAccountForm = this.formBuilder.group({
      username: [this.account.username, [Validators.required,  Validators.maxLength(100), containAllBlankCharacter]],
      fullName: [this.account.full_name, [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
      email: [this.account.email, [Validators.required, Validators.maxLength(100), Validators.email]],
      roleID: [this.account.role_id,[unselectOption]]
    });
  }

  get editAccountFormControl() { return this.editAccountForm.controls; }

  onEditUser() {
    this.editAccount = this.editAccountForm.value
    this.editAccount.id = this.account.account_id
    this.editAccount.roleID = this.account.role_id
    console.log(this.editAccount.id)
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
