import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtInterceptor, ErrorInterceptor } from './helper';

import { NuggetsListComponent } from './components/nuggets-list';
import { NuggetComponent } from './components/nugget/nugget.component';
import { LoginComponent } from './components/login';
import { HomeComponent } from './components/home';
import { AddNuggetComponent } from './components/add-nugget/add-nugget.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateNuggetComponent } from './components/update-nugget/update-nugget.component';
import { UserManagerComponent } from './components/user-management/user-manager.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NuggetsListComponent,
    NuggetComponent,
    LoginComponent,
    HomeComponent,
    AddNuggetComponent,
    AddUserComponent,
    UpdateNuggetComponent,
    UserManagerComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
