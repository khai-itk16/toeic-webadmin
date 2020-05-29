import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserManagementComponent } from './components/account/user-management/user-management.component';
import { CreateNewUserComponent } from './components/account/create-new-user/create-new-user.component';
import { EditUserComponent } from './components/account/edit-user/edit-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeftMainMenuComponent } from './components/left-main-menu/left-main-menu.component';
import { AccountService } from './services/account.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { TransferComponent } from './components/transfer/transfer.component';
import { DocumentManagementComponent } from './components/document/document-management/document-management.component';
import { TestListComponent } from './components/document/test-list/test-list.component';
import { GroupQuestionComponent } from './components/document/group-question/group-question.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserManagementComponent,
    CreateNewUserComponent,
    EditUserComponent,
    DashboardComponent,
    LeftMainMenuComponent,
    PageNotFoundComponent,
    TransferComponent,
    DocumentManagementComponent,
    TestListComponent,
    GroupQuestionComponent
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
