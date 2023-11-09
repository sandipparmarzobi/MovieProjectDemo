import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { UserHomeComponent } from './home/user-home/user-home.component';
import { ViewComponent } from './movie/view/view.component';
import { AddComponent } from './movie/add/add.component';
import { AuthService } from './services/Authentication/auth.service';
import { EditComponent } from './movie/edit/edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: UserHomeComponent },
  { path: 'view-movie', component: ViewComponent, canActivate: [AuthService] },
  { path: 'add-movie', component: AddComponent, canActivate: [AuthService] },
  {
    path: 'edit-movie/:id',
    component: EditComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
