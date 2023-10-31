import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
// HttpClientModule
import { HttpClientModule } from '@angular/common/http';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
