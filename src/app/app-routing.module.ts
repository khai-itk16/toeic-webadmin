import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { CreateNewUserComponent } from './components/create-new-user/create-new-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


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
    path: "user-management/create-new-user",
    component: CreateNewUserComponent
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
