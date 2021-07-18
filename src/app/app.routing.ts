import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { ViewProfileComponent } from './pages/profile/view-profile/view-profile';

const routes: Routes =[
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'view-profile/:id',     component: ViewProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'signin',           component: SigninComponent },
    { path: 'forgot-password',           component: ForgotPasswordComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
