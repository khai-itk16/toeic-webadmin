import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  constructor(private authService: AuthService, 
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() {
  }

  loginUser(){
    console.log(this.user)
    this.authService.loginUser(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem("token", res.data.accessToken);
        this.router.navigate(["/dashboard"])
        setTimeout(()=>{
          window.location.reload();
        }, 100);
      }, 
      error => {
        if(error.status == 401) {
          this.toastrService.error('username or password invaild', 'ERROR', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false
          });
        } else if(error.status == 403) {
          this.toastrService.warning('Account is locked', 'WARMING', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false
          });
        }
        
        console.log(error);
      }
    )
  }

}
