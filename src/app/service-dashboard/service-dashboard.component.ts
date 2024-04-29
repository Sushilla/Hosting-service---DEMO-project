import { Component } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';
import { ServerResourcesComponent } from './components/server-resources/server-resources.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServerProperties } from './Models/Interface/ServerProperties';
import ServerPlanJSON from '../../assets/data/ServerPlans.json';
import UserPropertiesJSON from '../../assets/data/UserProperties.json';
import { UserServerList } from './Models/Interface/UserServerList';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-dashboard',
  standalone: true,
  imports: [HeaderComponent, ServerResourcesComponent, ServiceListComponent, CommonModule],
  templateUrl: './service-dashboard.component.html',
  styleUrl: './service-dashboard.component.scss',
})
export class ServiceDashboardComponent {
  UserServersList: UserServerList[] = UserPropertiesJSON;
  ServerPlans: ServerProperties[] = ServerPlanJSON;

  SelectedService!: UserServerList | undefined;

  constructor() {
    console.log(this.ServerPlans);
    console.log(this.UserServersList[0]);
  }

}
