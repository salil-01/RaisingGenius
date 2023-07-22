import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../guards/user.guard';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { SigninComponent } from '../pages/signin/signin.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
