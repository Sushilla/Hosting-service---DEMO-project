import { Component, Input } from '@angular/core';
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

  AddNewServiceModal() {}
}
