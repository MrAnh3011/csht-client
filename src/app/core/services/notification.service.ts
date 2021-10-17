import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private notification: MatSnackBar) { };

  openNotification(message: string, action: string, className: string, duration: number = 1000) {
    this.notification.open(message, action, {
      duration: duration,
      panelClass: className
    });
  }

  showMessage(type: string, message: string) {
    this.openNotification(message, '', type + '-snackbar');
  }

  showNotification(type: string, message: string) {
    this.openNotification(message, '', type + '-snackbar');
  }

  showNotificationError(type: string, message: string) {
    this.openNotification(message, '', 'error-snackbar');
  }
}
