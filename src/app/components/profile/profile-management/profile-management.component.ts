import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css']
})
export class ProfileManagementComponent implements OnInit {

  profileAPI = { account_id: 0, username: '', full_name: '', email: '', role_name: '' }

  constructor(private profile: ProfileService, 
    private dataTransferService: DataTransferService) { }

  ngOnInit(): void { 
    this.profile.getProfile().subscribe(
      res => {
        this.profileAPI = res
        console.log(this.profileAPI)
        this.dataTransferService.setDataTranfer(this.profileAPI)
      },
      error => {
        console.log(error);      
      }
    );
  }
}
