import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { containAllBlankCharacter, MustMatch, unselectOption } from 'src/app/common/custom-validator-account';
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
  editAccount: any
  changPass = false

  roles = [{ roleId: 3, role: 'admin' }, { roleId: 2, role: 'editor' }, { roleId: 1, role: 'user' }]

  ngOnInit(): void {
    this.editAccountForm = this.formBuilder.group({
      username: [],
      firstName: [],
      lastName: [],
      email: [],
      phone: [],
      roleId: [],
      vipAccount: []
      }
    );
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.accountService.getAccountById(id).subscribe(
      res => {
        this.editAccount = res
        console.log(this.editAccount);
        this.editAccountForm = this.formBuilder.group({
          username: [this.editAccount.username, [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
          firstName: [this.editAccount.firstName, [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
          lastName: [this.editAccount.lastName, [Validators.required, Validators.maxLength(100), containAllBlankCharacter]],
          email: [this.editAccount.email, [Validators.required, Validators.maxLength(100), Validators.email]],
          phone: [this.editAccount.phone, [Validators.required, Validators.maxLength(10)]],
          roleId: [this.editAccount.roleEntities.length, [unselectOption]],
          vipAccount: [this.editAccount.vipAccount]
          }
        );
      },
      error => {
        console.log(error);      
      }
    );
  }


  get editAccountFormControl() { return this.editAccountForm.controls; }

  onEditUser() {
    let accountUpdate = this.editAccountForm.value
    
    if (accountUpdate != null) {
      accountUpdate.accountId = this.editAccount.accountId
      accountUpdate.status = this.editAccount.status
      accountUpdate.roleEntities = new Array()
      console.log("id:" + accountUpdate.roleId)
      switch(accountUpdate.roleId+"") {
        case "3": 
          accountUpdate.roleEntities.push({
            roleId: 1,
            roleName: "ROLE_ADMIN"
          })
        case "2": 
        accountUpdate.roleEntities.push({
            roleId: 2,
            roleName: "ROLE_CENSOR"
          })
        case "1": 
          accountUpdate.roleEntities.push({
            roleId: 3,
            roleName: "ROLE_USER"
          })
      }

      delete accountUpdate.roleId

      console.log(accountUpdate)

      Swal.fire({
        title: 'Are you sure to update account',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, don\'t update it'
      }).then((result) => {
        if (result.value) { 
          this.accountService.updateAccount(accountUpdate).subscribe( 
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
}
