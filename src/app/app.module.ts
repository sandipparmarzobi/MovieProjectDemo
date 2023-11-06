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
import { AdminHomeComponent } from './home/admin-home/admin-home.component';

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

// HttpClientModule for API calling
import { HttpClientModule } from '@angular/common/http';

// Toast Message
import { ToastsContainer } from 'src/app/Shared/toast/toasts-container/toasts-container.component';
// Angular Jwt Module
import { JwtModule } from '@auth0/angular-jwt';
import { MyProfileComponent } from './Account/my-profile/my-profile.component';

export function tokenGetter() {
  return localStorage.getItem('access_token'); // Change this to your token key
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserHomeComponent,
    AdminHomeComponent,
    LoginLayoutComponent,
    HeaderComponent,
    FooterComponent,
    MyProfileComponent,
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
    HttpClientModule,
    ToastsContainer,
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
