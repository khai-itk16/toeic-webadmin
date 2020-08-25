import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserManagementComponent } from './components/account/user-management/user-management.component';
import { CreateNewUserComponent } from './components/account/create-new-user/create-new-user.component';
import { EditUserComponent } from './components/account/edit-user/edit-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { LeftMainMenuComponent } from './components/left-main-menu/left-main-menu.component';
import { ProfileManagementComponent } from './components/profile/profile-management/profile-management.component';
import { ChangePassComponent } from './components/profile/change-pass/change-pass.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { GroupProductComponent } from './components/category/group-product/group-product.component';
import { TypeProductComponent } from './components/category/type-product/type-product.component';
import { CensorPostsComponent } from './components/sale-post/censor-posts/censor-posts.component';
import { StatisticalDataComponent } from './components/sale-post/statistical-data/statistical-data.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    children: [{ path: '', component: DashboardComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    children: [
      { path: '', component: ProfileManagementComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'change-pass', component: ChangePassComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "sale-post",
    children: [
      {
        path: "",
        redirectTo: "statistics",
        pathMatch: "full"
      },
      { path: "statistics", component: StatisticalDataComponent },
      { path: 'censor-posts', component: CensorPostsComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "user-management",
    children: [
      { path: '', component: UserManagementComponent },
      { path: 'create-new-user', component: CreateNewUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: "**", component: PageNotFoundComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "category",
    children: [
      { path: "", redirectTo: "group-product", pathMatch: "full" },
      { path: 'group-product', component: GroupProductComponent },
      { path: ':groupId/type-product', component: TypeProductComponent },
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
    children: [{ path: '', component: PageNotFoundComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
