import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeComponent } from './employee/employee.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guard/guard.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employee-detail/:EmployeeID', component: EmployeeDetailComponent },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EmployeeComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'location', component: LocationComponent },
      { path: 'banner', component: BannerComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
