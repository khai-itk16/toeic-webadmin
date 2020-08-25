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

  profileAPI = { username:"", firstName: "", lastName: "", email: "", phone: "", roleEntities: [{roleName:""}], vipAccount: false}

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
