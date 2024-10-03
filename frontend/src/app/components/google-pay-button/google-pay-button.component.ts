import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReadyToPayChangeResponse } from '@google-pay/button-angular';

@Component({
  selector: 'app-google-pay-button',
  templateUrl: './google-pay-button.component.html',
})
export class GooglePayButtonComponent {
  @Input() amount: string = '100.00';
  @Input() buttonType: google.payments.api.ButtonType = 'buy';
  @Input() buttonColor: google.payments.api.ButtonColor = 'default';
  @Input() buttonRadius?: number = 4;
  @Input() buttonLocale?: string = '';
  @Input() existingPaymentMethodRequired: boolean = false;
  @Input() merchantId: string = '12345678901234567890';
  @Input() merchantName: string = 'Demo Merchant';
  @Input() gateway: string = 'example';
  @Input() gatewayMerchantId: string = 'exampleGatewayMerchantId';
  @Input() currencyCode: string = 'EUR';
  @Input() countryCode: string = 'IT';

  @Output() paymentDataLoaded = new EventEmitter<google.payments.api.PaymentData>();
  @Output() paymentAuthorized = new EventEmitter<google.payments.api.PaymentData>();
  @Output() readyToPayChanged = new EventEmitter<ReadyToPayChangeResponse>();
  @Output() buttonClicked = new EventEmitter<void>();
  @Output() errorOccurred = new EventEmitter<ErrorEvent>();

  get paymentRequest(): google.payments.api.PaymentDataRequest {
    return {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: this.gateway,
              gatewayMerchantId: this.gatewayMerchantId,
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: this.merchantId,
        merchantName: this.merchantName,
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: this.amount,
        currencyCode: this.currencyCode,
        countryCode: this.countryCode,
      },
    };
  }

  onLoadPaymentData(event: Event): void {
    const paymentData = (event as any).detail as google.payments.api.PaymentData;
    this.paymentDataLoaded.emit(paymentData);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (paymentData) => {
    this.paymentAuthorized.emit(paymentData);
    return {
      transactionState: 'SUCCESS',
    };
  };

  onReadyToPayChange(event: Event): void {
    const response = (event as any).detail as ReadyToPayChangeResponse;
    this.readyToPayChanged.emit(response);
  }

  onClick(): void {
    this.buttonClicked.emit();
  }

  onError(error: ErrorEvent): void {
    this.errorOccurred.emit(error);
  }
}