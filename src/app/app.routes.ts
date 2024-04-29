import { Routes } from '@angular/router';
import { ServiceDashboardComponent } from './service-dashboard/service-dashboard.component';

export const routes: Routes = [
    {path: "", component: ServiceDashboardComponent},
    {path: "**", redirectTo: "", pathMatch: "full"}
];
