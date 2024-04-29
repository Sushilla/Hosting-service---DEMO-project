import {
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ServerPlanLongEnum } from '../../../service-dashboard/Models/Enum/ServerPlanEnum';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Pricing } from '../../../service-dashboard/Models/Interface/Pricing';
import { MatSliderModule } from '@angular/material/slider';
import {
  ServerConfiguration,
  UserServerList,
} from '../../../service-dashboard/Models/Interface/UserServerList';
import { UIServiceService } from '../../../service-dashboard/Services/UIService/uiservice.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new-service-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    CommonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatIconModule,
  ],
  templateUrl: './new-service-modal.component.html',
  styleUrl: './new-service-modal.component.scss',
})
export class NewServiceModalComponent {
  PlanEnum = ServerPlanLongEnum;
  @ViewChild('stepper') stepper!: MatStepper;

  SelectionPlanGroup = this._formBuilder.group({
    // Domain
    SelectedDomain: [false],
    DomainValue: [''],
    // Server
    SelectedServer: [false],
    ServerPlan: [0],
    ServerDefaultStorage: [true],
    ServerStorageSize: [128],
    // Email
    SelectedEmailProtection: [false],
    EmailValue: [''],
    // Name
    ServiceName: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pricing,
    private _formBuilder: FormBuilder,
    private uiService: UIServiceService,
    private dialogRef: MatDialogRef<NewServiceModalComponent>
  ) {}

  get f() {
    return this.SelectionPlanGroup.value;
  }

  GetPriceForYear(): number {
    let year_price = 0;
    // Price for domain
    if (this.f.SelectedDomain) year_price += this.data.domain_yearly;
    // Price for server
    if (this.f.SelectedServer && typeof this.f.ServerPlan == 'number') {
      year_price += this.data.server_monthly[this.f.ServerPlan] * 12;
      // Custom storage
      if (
        !this.f.ServerDefaultStorage &&
        typeof this.f.ServerStorageSize == 'number'
      ) {
        year_price +=
          this.data.storage_for_gb_monthly * this.f.ServerStorageSize * 12;
      }
    }
    // Price for email protection
    if (this.f.SelectedEmailProtection)
      year_price += this.data.email_protection_monthly * 12;
    return year_price;
  }

  GetFormatedStorageText(): string {
    let storage: string = '';
    if (this.f.ServerStorageSize) {
      if (this.f.ServerStorageSize < 1000) {
        storage = `${this.f.ServerStorageSize} GB`;
      } else {
        var terabytes = Math.floor(this.f.ServerStorageSize / 1024);
        var gigabytes = this.f.ServerStorageSize % 1024;
        if (gigabytes != 0) storage = `${terabytes} TB and ${gigabytes} GB`;
        else storage = `${terabytes} TB`;
      }
    }
    return storage;
  }

  CreateNewService() {
    let canCreate: Boolean = false;
    let newService: UserServerList = {} as UserServerList;
    newService.server_configuration = {} as ServerConfiguration;

    if (
      typeof this.f.SelectedDomain == 'boolean' &&
      typeof this.f.SelectedEmailProtection == 'boolean' &&
      typeof this.f.SelectedServer == 'boolean'
    ) {
      // Status configuration
      newService.own_domain = this.f.SelectedDomain;
      newService.own_server = this.f.SelectedServer;
      newService.email_protection = this.f.SelectedEmailProtection;

      // Domain configuration
      if (this.f.SelectedDomain && typeof this.f.DomainValue == 'string') {
        newService.domain = this.f.DomainValue;
      }

      // Server configuration
      if (!this.f.SelectedDomain && this.f.SelectedServer) {
        newService.domain = this.uiService.GenerateRandomIPv4Address();
      } else if (
        this.f.SelectedServer &&
        this.f.SelectedServer &&
        typeof this.f.DomainValue == 'string'
      ) {
        newService.domain = this.f.DomainValue;
      }

      if (this.f.SelectedServer) {
        if (typeof this.f.ServerPlan == 'number')
          // Plan
          newService.server_configuration.current_server_plan =
            this.f.ServerPlan;

        if (typeof this.f.ServerStorageSize == 'number') {
          // Storage
          if (this.f.ServerDefaultStorage)
            newService.server_configuration.storage = 10;
          else
            newService.server_configuration.storage = this.f.ServerStorageSize;
        }
      } else {
        newService.server_configuration.current_server_plan = 0;
        newService.server_configuration.storage = 0;
      }

      newService.server_configuration.used_storage = 0;
      if (typeof this.f.ServiceName == 'string')
        newService.service_name = this.f.ServiceName;
      if (this.f.ServiceName !== '') canCreate = true;
    }
    if (canCreate) this.dialogRef.close(newService);
  }

  MoveToNextPage() {
    this.stepper.selectedIndex += 1;
  }
}
