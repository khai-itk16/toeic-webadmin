import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as jwt_decode from "jwt-decode";
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css']
})
export class ProfileManagementComponent implements OnInit {

  profileAPI = { account_id: 0, username: '', full_name: '', email: '', role_id: 0 }

  constructor(private accountService: AccountService, 
    private dataTransferService: DataTransferService) { }

  ngOnInit(): void { 
    const tokenInfo = this.getDecodedAccessToken();
    const id = tokenInfo.userID
    this.accountService.getAccountById(id).subscribe(
      res => {
        this.profileAPI = res.data
        console.log(this.profileAPI)
        this.dataTransferService.setDataTranfer(this.profileAPI)
      },
      error => {
        console.log(error);      
      }
    );
  }

  getDecodedAccessToken(): any {
    try{
      const token = localStorage.getItem('token')
      return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
