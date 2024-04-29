import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ServerConfiguration } from '../../../service-dashboard/Models/Interface/UserServerList';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { ServerPlanLongEnum } from '../../../service-dashboard/Models/Enum/ServerPlanEnum';
import { FormsModule } from '@angular/forms';
import { Pricing } from '../../../service-dashboard/Models/Interface/Pricing';
import { MatSliderModule } from '@angular/material/slider';

interface StoragePricing {
  server_configuration: ServerConfiguration;
  service_pricing: Pricing;
}

@Component({
  selector: 'app-storage-space-upgrade',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatRadioModule,
    CommonModule,
    FormsModule,
    MatSliderModule,
  ],
  templateUrl: './storage-space-upgrade.component.html',
  styleUrl: './storage-space-upgrade.component.scss',
})
export class StorageSpaceUpgradeComponent {
  PlanEnum = ServerPlanLongEnum;
  data!: StoragePricing;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data_original: StoragePricing,
    private dialogRef: MatDialogRef<StorageSpaceUpgradeComponent>
  ) {
    this.data = structuredClone(this.data_original);
  }

  GetFormatedStorageText(): string {
    let storage: string = '';
    if (this.data.server_configuration.storage) {
      if (this.data.server_configuration.storage < 1000) {
        storage = `${this.data.server_configuration.storage} GB`;
      } else {
        var terabytes = Math.floor(
          this.data.server_configuration.storage / 1024
        );
        var gigabytes = this.data.server_configuration.storage % 1024;
        if (gigabytes != 0) storage = `${terabytes} TB and ${gigabytes} GB`;
        else storage = `${terabytes} TB`;
      }
    }
    return storage;
  }

  UpdateCurrentStorage() {
    this.dialogRef.close(this.data.server_configuration);
  }
}
