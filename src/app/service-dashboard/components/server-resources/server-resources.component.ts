import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ServerProperties } from '../../Models/Interface/ServerProperties';
import { MatDialog } from '@angular/material/dialog';
import { UserServerList } from '../../Models/Interface/UserServerList';
import { CPUInformationModalComponent } from '../../../Components/Modal/cpu-information-modal/cpu-information-modal.component';

@Component({
  selector: 'app-server-resources',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './server-resources.component.html',
  styleUrl: './server-resources.component.scss',
})
export class ServerResourcesComponent {
  server_load: number = 1;

  @Input() UserPlanProperties!: ServerProperties;
  @Input() UserServerProperties!: UserServerList;
  @Output() ClosePanel = new EventEmitter();

  constructor(public dialog: MatDialog) {
    this.SimulateServerLoad();
  }

  SimulateServerLoad() {
    let currentLoad = 1; // Initial server load
    let trend = 1; // Initial load trend, can be positive (increase) or negative (decrease)
    setInterval(() => {
      // Generate a random value to represent fluctuations
      const fluctuation = Math.random() * 10 - 5; // Random number between -5 and 5

      // Generate occasional spikes
      const spikeChance = Math.random();
      if (spikeChance < 0.1) {
        currentLoad += 50 + Math.random() * 50;
      } else if (spikeChance > 0.8) {
        currentLoad = currentLoad / 2;
      }

      // Adjust the trend randomly
      const trendChangeChance = Math.random();
      if (trendChangeChance < 0.1) {
        // 10% chance of changing trend
        trend = Math.random() < 0.5 ? 1 : -1; // Randomly set the trend to positive or negative
      }

      // Update current load based on trend and fluctuations
      currentLoad += trend * fluctuation;

      // Ensure the load stays within 0 and 100
      this.server_load = Math.round(Math.max(1, Math.min(100, currentLoad)));
    }, 1000);
  }

  OpenCPUInformationModal() {
    console.log(this.UserPlanProperties);

    this.dialog.open(CPUInformationModalComponent, {
      data: this.UserPlanProperties.cpu_properties,
    });
  }

  IncreaseServerStorage() {}
}
