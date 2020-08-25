import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

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

    $(document).ready(function () {

      $("#sideNav").click(function(){
        if($(this).hasClass('closed')){
          $('.navbar-side').animate({left: '0px'});
          $(this).removeClass('closed');
          $('#page-wrapper').animate({'margin-left' : '260px'});
        }
        else{
            $(this).addClass('closed');
          $('.navbar-side').animate({left: '-260px'});
                  $('#page-wrapper').animate({'margin-left' : '0px'}); 
        }
      });

      $(document).scroll(function() {
          if ($(document).scrollTop() < 20){
            $(".back-to-top").css("display", "none")
            $(".back-to-top").removeClass("fadeIn")
          } else {
            $(".back-to-top").css("display", "inline")
            $(".back-to-top").addClass("fadeIn")
          } 
      });
  
      $(".back-to-top").click(function (e) { 
          e.preventDefault();
          $("html,body").animate({
          scrollTop: 0
      }, 700);
      });
  });
  }

  logoutUser() {
    this.authService.logoutUser();
    this.ngOnInit();
  }
}
