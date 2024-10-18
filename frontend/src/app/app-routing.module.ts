import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './student/login/login.component';
import { RegisterComponent } from './student/register/register.component';
import { SigninComponent } from './admin/signin/signin.component';
import { StudashboardComponent } from './student/studashboard/studashboard.component';
import { MarksComponent } from './student/marks/marks.component';
import { AuthGuard } from './auth.guard';
import { AdmindashComponent } from './admin/admindash/admindash.component';
import { EditComponent } from './admin/edit/edit.component';
import { EditstuComponent } from './student/editstu/editstu.component';

const routes: Routes = [
  {path:'register', component:RegisterComponent},
  {path:'admin',component:SigninComponent},
  {path:'dashboard', component:StudashboardComponent,canActivate:[AuthGuard],children:[
    {path:'marks',component:MarksComponent},
    {path:'edit',component:EditstuComponent}
  ]},
  {path:'adashboard', component:AdmindashComponent,canActivate:[AuthGuard],children:[
    {path:'edit',component:EditComponent}
  ]},
  {path:'', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
