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
import { LeftMainMenuComponent } from './components/left-main-menu/left-main-menu.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ProfileManagementComponent } from './components/profile/profile-management/profile-management.component';
import { ChangePassComponent } from './components/profile/change-pass/change-pass.component';
import { DataTransferService } from './services/data-transfer.service';
import { GroupProductComponent } from './components/category/group-product/group-product.component';
import { TypeProductComponent } from './components/category/type-product/type-product.component';
import { CategoryDialogComponent } from './components/category/category-dialog/category-dialog.component';
import { CensorPostsComponent } from './components/sale-post/censor-posts/censor-posts.component';
import { StatisticalDataComponent } from './components/sale-post/statistical-data/statistical-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserManagementComponent,
    CreateNewUserComponent,
    EditUserComponent,
    DashboardComponent,
    LeftMainMenuComponent,
    PageNotFoundComponent,
    ProfileManagementComponent,
    EditProfileComponent,
    ChangePassComponent,
    GroupProductComponent,
    TypeProductComponent,
    CategoryDialogComponent,
    CensorPostsComponent,
    StatisticalDataComponent
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
  providers: [
    AuthService, 
    AccountService, 
    AuthGuard, 
    DataTransferService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
