import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ServerConfiguration } from '../../../service-dashboard/Models/Interface/UserServerList';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  templateUrl: './storage-space-upgrade.component.html',
  styleUrl: './storage-space-upgrade.component.scss',
})
export class StorageSpaceUpgradeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ServerConfiguration) {
    console.log(data);
  }
}
