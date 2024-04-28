import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { ServerProperties } from '../../../service-dashboard/Models/Interface/ServerProperties';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cpuinformation-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatDialogModule],
  templateUrl: './cpuinformation-modal.component.html',
  styleUrl: './cpuinformation-modal.component.scss'
})
export class CPUInformationModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ServerProperties) {
    console.log(data);
  }
}
