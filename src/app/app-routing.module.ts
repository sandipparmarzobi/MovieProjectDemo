import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { UserHomeComponent } from './home/user-home/user-home.component';
import { ViewComponent } from './movie/view/view.component';
import { AddComponent } from './movie/add/add.component';
import { AuthService } from './services/Authentication/auth.service';
import { EditComponent } from './movie/edit/edit.component';
import { AddTheaterComponent } from './theater/add-theater/add-theater.component';
import { ViewTheaterComponent } from './theater/view-theater/view-theater.component';
import { EditTheaterComponent } from './theater/edit-theater/edit-theater.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: UserHomeComponent },
  { path: 'add-movie', component: AddComponent, canActivate: [AuthService] },
  { path: 'view-movie', component: ViewComponent, canActivate: [AuthService] },
  {
    path: 'edit-movie/:id',
    component: EditComponent,
    canActivate: [AuthService],
  },
  {
    path: 'add-theater',
    component: AddTheaterComponent,
    canActivate: [AuthService],
  },
  {
    path: 'view-theater',
    component: ViewTheaterComponent,
    canActivate: [AuthService],
  },
  {
    path: 'edit-theater/:id',
    component: EditTheaterComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
