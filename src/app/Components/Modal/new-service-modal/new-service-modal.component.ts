import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { ServerPlanLongEnum } from '../../../service-dashboard/Models/Enum/ServerPlanEnum';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Pricing } from '../../../service-dashboard/Models/Interface/Pricing';
import { MatSliderModule } from '@angular/material/slider';

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
  ],
  templateUrl: './new-service-modal.component.html',
  styleUrl: './new-service-modal.component.scss',
})
export class NewServiceModalComponent {
  PlanEnum = ServerPlanLongEnum;

  SelectionPlanGroup = this._formBuilder.group({
    // Domain
    SelectedDomain: [false],
    DomainValue: [''],
    // Server
    SelectedServer: [false],
    ServerPlan: 0,
    ServerDefaultStorage: [true],
    ServerStorageSize: 128,
    // Email
    SelectedEmailProtection: [false],
    EmailValue: [''],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pricing,
    private _formBuilder: FormBuilder
  ) {
    console.log(data);
  }

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

  CreateNewService(){
    
  }
}
