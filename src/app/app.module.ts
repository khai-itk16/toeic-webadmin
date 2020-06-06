import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {  MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountService } from './services/account.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { UserManagementComponent } from './components/account/user-management/user-management.component';
import { CreateNewUserComponent } from './components/account/create-new-user/create-new-user.component';
import { EditUserComponent } from './components/account/edit-user/edit-user.component';
import { DocumentManagementComponent } from './components/document/document-management/document-management.component';
import { TestListComponent } from './components/document/test-list/test-list.component';
import { GroupQuestionComponent } from './components/document/group-question/group-question.component';
import { LeftMainMenuComponent } from './components/left-main-menu/left-main-menu.component';
import { PopupGroupComponent } from './components/document/popup-group/popup-group.component';
import { PopupTestComponent } from './components/document/popup-test/popup-test.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserManagementComponent,
    CreateNewUserComponent,
    EditUserComponent,
    DashboardComponent,
    DocumentManagementComponent,
    TestListComponent,
    GroupQuestionComponent,
    LeftMainMenuComponent,
    PageNotFoundComponent,
    PopupGroupComponent,
    PopupTestComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot() 
  ],
  providers: [AuthService, AccountService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [ PopupGroupComponent ]
})
export class AppModule { }
