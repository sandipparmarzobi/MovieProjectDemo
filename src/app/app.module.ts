import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Account >> Login And Register
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';

// Home >> User And Admin
import { UserHomeComponent } from './home/user-home/user-home.component';

//  Header And Footer
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// HttpClientModule for API calling
import { HttpClientModule } from '@angular/common/http';

// Toast Message
import { ToastsContainer } from 'src/app/Shared/toast/toasts-container/toasts-container.component';
// Angular Jwt Module
import { JwtModule } from '@auth0/angular-jwt';
import { MyProfileComponent } from './Account/my-profile/my-profile.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddComponent } from './movie/add/add.component';
import { ViewComponent } from './movie/view/view.component';
import { EditComponent } from './movie/edit/edit.component';
import { AddTheaterComponent } from './theater/add-theater/add-theater.component';
import { ViewTheaterComponent } from './theater/view-theater/view-theater.component';
import { EditTheaterComponent } from './theater/edit-theater/edit-theater.component';
import { AddShowtimeComponent } from './showtime/add-showtime/add-showtime.component';
import { EditShowtimeComponent } from './showtime/edit-showtime/edit-showtime.component';
import { ViewShowtimeComponent } from './showtime/view-showtime/view-showtime.component';
import { ViewMovieComponent } from './movie/view-movie/view-movie.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';

export function tokenGetter() {
  return localStorage.getItem('access_token'); // Change this to your token key
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserHomeComponent,
    LoginLayoutComponent,
    HeaderComponent,
    FooterComponent,
    MyProfileComponent,
    AddComponent,
    ViewComponent,
    EditComponent,
    AddTheaterComponent,
    ViewTheaterComponent,
    EditTheaterComponent,
    AddShowtimeComponent,
    EditShowtimeComponent,
    ViewShowtimeComponent,
    ViewMovieComponent,
    AddUserComponent,
    ViewUserComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule,
    HttpClientModule,
    ToastsContainer,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CarouselModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:5084'], // Replace with your API domain
        disallowedRoutes: ['http://localhost:5084'], // Replace with your login route
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
