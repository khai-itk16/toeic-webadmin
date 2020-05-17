import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { CreateNewUserComponent } from './components/create-new-user/create-new-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeftMainMenuComponent } from './components/left-main-menu/left-main-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserManagementComponent,
    CreateNewUserComponent,
    EditUserComponent,
    DashboardComponent,
    LeftMainMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
