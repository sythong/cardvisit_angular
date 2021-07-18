import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin';
import { ForgotPasswordComponent } from './forgot-password/forgot-password';
import { UserService } from 'app/services/user.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ViewProfileComponent } from './profile/view-profile/view-profile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DragDropModule,
        NgxQRCodeModule
    ],
    declarations: [
        SignupComponent,
        SigninComponent,
        ProfileComponent,
        ForgotPasswordComponent,
        ViewProfileComponent,
    ]
})
export class PagesModule { }
