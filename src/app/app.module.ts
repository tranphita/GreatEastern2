import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/guard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent } from './location/location.component';
import { AddEditLocationComponent } from './add-edit-location/add-edit-location.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { BannerComponent } from './banner/banner.component';
import { AddEditBannerComponent } from './add-edit-banner/add-edit-banner.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    EmployeeComponent,
    AddEditEmployeeComponent,
    LocationComponent,
    AddEditLocationComponent,
    EmployeeDetailComponent,
    BannerComponent,
    AddEditBannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    QRCodeModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
