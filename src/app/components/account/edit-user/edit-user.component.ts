import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { containAllBlankCharacter, MustMatch, unselectOption } from 'src/app/common/custom-validator-account';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.editAccountForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), containAllBlankCharacter]],
      fullName: ['', [Validators.required, Validators.minLength(4), containAllBlankCharacter]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), containAllBlankCharacter]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), containAllBlankCharacter]],
      roleID: ['',[unselectOption]]
    },{
      validators: MustMatch('password', 'confirmPassword')
    });

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
  }

  onEditUser() {
    this.editAccount = this.editAccountForm.value
    this.editAccount.id = this.account.account_id
    this.editAccount.roleID = this.account.role_id
    console.log(this.editAccount.id)
    if ( this.editAccount != null) {
      console.log(this.editAccount)
      this.accountService.updateAccount(this.editAccount).subscribe (
        res => {
          this.router.navigate(["/user-management"])
          setTimeout(()=>{
            window.location.reload();
            alert("update success")
            console.log(res)
          }, 100);
        },
        error => {
          alert("update error")
          console.log(error)
        }
      )
    }
  }

  onBack() {
    this.router.navigate(["/user-management"])
  }

}
