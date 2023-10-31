import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';

import { UserHomeComponent } from './home/user-home/user-home.component';
import { AdminHomeComponent } from './home/admin-home/admin-home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { layout: 'login' } }, // Set the default route to the LoginComponent
  { path: 'register', component: RegisterComponent, data: { layout: 'login' } }, // Add other routes as needed
  { path: 'user', component: UserHomeComponent }, // Add other routes as needed
  { path: 'admin', component: AdminHomeComponent }, // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
