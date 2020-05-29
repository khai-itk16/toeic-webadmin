import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
<<<<<<< Updated upstream
import { HomeComponent } from './components/home/home.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { CreateNewUserComponent } from './components/create-new-user/create-new-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
=======
import { UserManagementComponent } from './components/account/user-management/user-management.component';
import { CreateNewUserComponent } from './components/account/create-new-user/create-new-user.component';
import { EditUserComponent } from './components/account/edit-user/edit-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { TransferComponent } from './components/transfer/transfer.component';
import { DocumentManagementComponent } from './components/document/document-management/document-management.component';
import { TestListComponent } from './components/document/test-list/test-list.component';
import { GroupQuestionComponent } from './components/document/group-question/group-question.component';
>>>>>>> Stashed changes


const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "user-management",
    component: UserManagementComponent
  },
  {
    path: "document-management",
    component: TransferComponent,
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
    path: "user-management/edit-user/:id",
    component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
