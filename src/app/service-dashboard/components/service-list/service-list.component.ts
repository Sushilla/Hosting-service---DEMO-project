import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UserServerList } from '../../Models/Interface/UserServerList';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
})
export class ServiceListComponent {
  @Input() UserServiceList!: UserServerList[];
  @Output() ServerInformationData = new EventEmitter();

  GetPercentageOfFreeStorage(service_data: UserServerList): number {
    return (
      service_data.server_configuration.used_storage /
      service_data.server_configuration.storage
    );
  }

  AddNewServiceModal() {}

  GetServiceType(server: boolean, domain: boolean, email: boolean): string {
    var type: string[] = [];
    if(server)
      type.push("Server");
    if(domain)
      type.push("Domain");
    if(email)
      type.push("Email");
    return type.join(' / ');
  }
}
