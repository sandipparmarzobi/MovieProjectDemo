import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';

import { UserHomeComponent } from './home/user-home/user-home.component';
import { ViewComponent } from './movie/view/view.component';
import { AddComponent } from './movie/add/add.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { layout: 'login' } }, // Set the default route to the LoginComponent
  { path: 'register', component: RegisterComponent, data: { layout: 'login' } }, // Add other routes as needed
  { path: '', component: UserHomeComponent }, // Add other routes as needed
  { path: 'view-movie', component: ViewComponent },
  { path: 'add-movie', component: AddComponent }, // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
