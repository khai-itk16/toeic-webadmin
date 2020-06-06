import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'toeic-webadmin';
  statusLogin: boolean;
  constructor(private authService: AuthService,
    private toastrService: ToastrService){}

  ngOnInit(): void {
    this.statusLogin = this.authService.loggedIn();
    if(this.statusLogin) {
      this.toastrService.success('Login success', 'SUCCESS', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      });
    }
  }

  logoutUser() {
    this.authService.logoutUser();
    this.ngOnInit();
  }
}
