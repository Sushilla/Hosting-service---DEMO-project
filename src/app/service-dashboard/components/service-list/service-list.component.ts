import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UserServerList } from '../../Models/Interface/UserServerList';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Pricing } from '../../Models/Interface/Pricing';
import { ServerPlanEnum } from '../../Models/Enum/ServerPlanEnum';
import { MatDialog } from '@angular/material/dialog';
import { NewServiceModalComponent } from '../../../Components/Modal/new-service-modal/new-service-modal.component';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
})
export class ServiceListComponent {
  @Input() UserServiceList!: UserServerList[];
  @Input() ServicePricing!: Pricing;
  @Output() ServerInformationData = new EventEmitter();

  private PlanEnum = ServerPlanEnum;

  constructor(private dialog: MatDialog) {
    setTimeout(() => {
      this.AddNewServiceModal();
    }, 500);
  }

  GetPercentageOfFreeStorage(service_data: UserServerList): number {
    return (
      service_data.server_configuration.used_storage /
      service_data.server_configuration.storage
    );
  }

  GetServiceType(
    server: boolean,
    domain: boolean,
    email: boolean,
    plan: number
  ): string {
    let type: string[] = [];
    if (server) type.push('Server [' + this.PlanEnum[plan] + ']');
    if (domain) type.push('Domain');
    if (email) type.push('Email');
    return type.join(' / ');
  }

  CalculateYearlyPrice(service: UserServerList): number {
    let price_yearly: number = 0;
    // Price for yearly domain
    if (service.own_domain) price_yearly += this.ServicePricing.domain_yearly;
    // Price for monthly email protection
    if (service.email_protection)
      price_yearly += this.ServicePricing.email_protection_monthly * 12;
    // Price for monthly server
    if (service.own_server) {
      price_yearly +=
        this.ServicePricing.server_monthly[
          service.server_configuration.current_server_plan
        ] * 12;
      // 10 GB are free. For more, need to pay monthly charge
      if (service.server_configuration.storage > 10)
        price_yearly +=
          service.server_configuration.storage *
          this.ServicePricing.storage_for_gb_monthly *
          12;
    }
    return price_yearly;
  }

  AddNewServiceModal() {
    this.dialog.open(NewServiceModalComponent, {
      data: this.ServicePricing,
    });
  }
}
