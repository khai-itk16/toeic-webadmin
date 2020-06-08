import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserManagementComponent } from './components/account/user-management/user-management.component';
import { CreateNewUserComponent } from './components/account/create-new-user/create-new-user.component';
import { EditUserComponent } from './components/account/edit-user/edit-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentManagementComponent } from './components/document/document-management/document-management.component';
import { TestListComponent } from './components/document/test-list/test-list.component';
import { GroupQuestionComponent } from './components/document/group-question/group-question.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { LeftMainMenuComponent } from './components/left-main-menu/left-main-menu.component';
import { ProfileManagementComponent } from './components/profile/profile-management/profile-management.component';
import { ChangePassComponent } from './components/profile/change-pass/change-pass.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: LeftMainMenuComponent,
    children: [{ path: '', component: DashboardComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    component: LeftMainMenuComponent,
    children: [
      { path: '', component: ProfileManagementComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'change-pass', component: ChangePassComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "user-management",
    component: LeftMainMenuComponent,
    children: [
      { path: '', component: UserManagementComponent },
      { path: 'create-new-user', component: CreateNewUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: "**", component: PageNotFoundComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "document-management",
    component: LeftMainMenuComponent,
    children: [
      { path: '', component: DocumentManagementComponent },
      { path: 'test-list', component: TestListComponent },
      { path: 'test-list/:id', component: GroupQuestionComponent },
      { path: "**", component: PageNotFoundComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    component: LeftMainMenuComponent,
    children: [{ path: '', component: PageNotFoundComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
