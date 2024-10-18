import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './admin/signin/signin.component';
import { RegisterComponent } from './student/register/register.component';
import { LoginComponent } from './student/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfoService } from './student/info.service';
import { GetinfoService } from './admin/getinfo.service';
import { StudashboardComponent } from './student/studashboard/studashboard.component';
import { MarksComponent } from './student/marks/marks.component';
import { AdmindashComponent } from './admin/admindash/admindash.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { EditComponent } from './admin/edit/edit.component';
import { EditstuComponent } from './student/editstu/editstu.component';
@NgModule({
  declarations: [
    AppComponent,
   LoginComponent,
   RegisterComponent,
   SigninComponent,
   StudashboardComponent,
   MarksComponent,
   AdmindashComponent,
   NavbarComponent,
   EditComponent,
   EditstuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  providers: [InfoService,GetinfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
