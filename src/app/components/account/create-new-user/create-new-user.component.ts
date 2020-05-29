import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }

  onCreateNewUser() {
    this.router.navigate(["/user-management"])
  }

  onBack() {
    this.router.navigate(["/user-management"])
  }

}
