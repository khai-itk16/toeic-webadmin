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
  statusLogin = false;

  constructor(private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
  }

  loginUser(){
    console.log(this.user)
    this.authService.loginUser(this.user).subscribe(
      res => {
        console.log(res);
        this.statusLogin = true;
        localStorage.setItem("token", res.data.accessToken);
        // localStorage.setItem("token", res.token);
        this.router.navigate(["/dashboard"])
        setTimeout(()=>{
          window.location.reload();
        }, 100);
      }, 
      error => {
        this.statusLogin = false;
        console.log(error);
      }
    )
  }

}
