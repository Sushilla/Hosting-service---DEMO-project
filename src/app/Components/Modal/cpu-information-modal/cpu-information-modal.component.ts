import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CPUProperties } from '../../../service-dashboard/Models/Interface/ServerProperties';

@Component({
  selector: 'app-cpu-information-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './cpu-information-modal.component.html',
  styleUrl: './cpu-information-modal.component.scss',
})
export class CPUInformationModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CPUProperties) {}
}
