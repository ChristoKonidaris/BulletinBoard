import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { PostCreateComponent} from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostDisplayComponent } from './posts/post-display/post-display.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor} from './error-interceptor';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostCreateComponent,
    HeaderComponent,
    PostDisplayComponent,
    SignUpComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],

  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
