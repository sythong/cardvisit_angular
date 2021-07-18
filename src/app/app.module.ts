import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { SelectIconContent } from './pages/profile/select-icon/select-icon';
import { PagesModule } from './pages/pages.module';
import { UserService } from './services/user.service';
import { AuthHttp } from './app.auth-http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingService } from './services/setting.service';
import { SelectCustomContent } from './pages/profile/select-custom/select-custom';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SelectBackgroundContent } from './pages/profile/select-background/select-background';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SelectIconContent,
    SelectCustomContent,
    SelectBackgroundContent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    PagesModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxQRCodeModule
  ],
  entryComponents: [
    SelectIconContent,
    SelectCustomContent,
    SelectBackgroundContent
  ],
  providers: [
    AuthHttp,
    UserService,
    SettingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
