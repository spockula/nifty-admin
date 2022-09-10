import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomeComponent } from './core/components/home/home.component';
import { ApprovalComponent } from './core/components/approval/approval.component';
import { EllipsisComponent } from './core/components/ellipsis/ellipsis.component';
import { MainService } from './services/main.service';
import { DetailsComponent } from './core/components/details/details.component';
import { ContactMessagesComponent } from './core/components/contact-messages/contact-messages.component';
import { SubscribersComponent } from './core/components/subscribers/subscribers.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ApprovalComponent,
    EllipsisComponent,
    DetailsComponent,
    ContactMessagesComponent,
    SubscribersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    FormsModule
  ],
  providers: [MainService, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent],
  exports: [
    ContactMessagesComponent,
    SubscribersComponent
  ]
})
export class AppModule { }
