import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  loginUser () {

    console.log(this.user)
    localStorage.setItem("token", "abcd")
    // this.authService.loginUser(this.user)
    // .subscribe(
    //   res => {
    //     console.log(res)
    //     localStorage.setItem("token", res.token)
    //   },
    //   err => console.log(err)
    // ) 
  }

}
