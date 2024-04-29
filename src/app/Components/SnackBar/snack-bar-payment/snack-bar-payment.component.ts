import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-payment',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
  templateUrl: './snack-bar-payment.component.html',
  styleUrl: './snack-bar-payment.component.scss',
})
export class SnackBarPaymentComponent {
  snackBarRef = inject(MatSnackBarRef);
}
