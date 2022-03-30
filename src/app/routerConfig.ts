import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { OverviewComponent } from './overview/overview.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: OverviewComponent
  },
  {
    path: 'create',
    component: CustomerComponent
  },
  {
    path: 'edit',
    component: CustomerComponent
  }
];
export default appRoutes;