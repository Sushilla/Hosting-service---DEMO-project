import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UserServerList } from '../../Models/Interface/UserServerList';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
})
export class ServiceListComponent {
  @Input() UserServiceList!: UserServerList[];

  AddNewServiceModal() {}
}
