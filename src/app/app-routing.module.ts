import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './core/components/home/home.component';
import { DetailsComponent } from './core/components/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: { showHeader: true }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { showHeader: false }
  },
  {
    path: 'details/:asset',
    component: DetailsComponent,
    data: { showHeader: true }
  }
];
const routerOptions: ExtraOptions = {
    useHash: false,
    scrollPositionRestoration: 'top',
    relativeLinkResolution: 'legacy'
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
