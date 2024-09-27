// src/app/services/toast.service.ts

import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top',
      color: this.getColor(type),
      icon: this.getIcon(type),
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Toast closed');
          }
        }
      ],
      cssClass: 'custom-toast',
    });

    await toast.present();
  }

  private getColor(type: string): string {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': 
      default: return 'primary';
    }
  }

  private getIcon(type: string): string {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'error': return 'alert-circle';
      case 'warning': return 'warning';
      case 'info':
      default: return 'information-circle';
    }
  }
}