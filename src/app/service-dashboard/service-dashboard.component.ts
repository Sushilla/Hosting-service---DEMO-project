import { Component } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';
import { ServerResourcesComponent } from './components/server-resources/server-resources.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServerProperties } from './Models/Interface/ServerProperties';
import ServerPlanJSON from '../../assets/data/ServerPlans.json';
import UserPropertiesJSON from '../../assets/data/UserProperties.json';
import PricingJSON from '../../assets/data/Pricing.json';
import { UserServerList } from './Models/Interface/UserServerList';
import { CommonModule } from '@angular/common';
import { Pricing } from './Models/Interface/Pricing';

@Component({
  selector: 'app-service-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    ServerResourcesComponent,
    ServiceListComponent,
    CommonModule,
  ],
  templateUrl: './service-dashboard.component.html',
  styleUrl: './service-dashboard.component.scss',
})
export class ServiceDashboardComponent {
  UserServersList: UserServerList[] = UserPropertiesJSON;
  ServerPlans: ServerProperties[] = ServerPlanJSON;
  PricingForService: Pricing = PricingJSON;

  SelectedService!: UserServerList | undefined;

  constructor() {}
}
