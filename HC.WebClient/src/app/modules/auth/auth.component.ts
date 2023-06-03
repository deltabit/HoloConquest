import { Component } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MetamaskService } from 'src/app/services/metamask.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  message: string | null = null;

  constructor(private metamaskService: MetamaskService) {}

  ngOnInit(): void {}

  connect() {
    this.message = 'Connecting...';
    this.metamaskService.checkMetamaskInstallation().pipe(
      switchMap(isInstalled => {
        if (isInstalled) {
          this.message = 'MetaMask is installed. Connecting to the wallet...';
          return this.metamaskService.connectWallet();
        } else {
          this.message = 'MetaMask is not installed.';
          return of(null);
        }
      }),
      switchMap(account => {
        if (account) {
          this.message = 'Connected to the wallet. Signing message...';
          console.log(account);
          return this.metamaskService.signMessage(account);
        } else {
          this.message = 'Failed to connect to the wallet.';
          return of(null);
        }
      })
    ).subscribe({
      next: (signature) => {
        if (signature) {
          this.message = 'Message signed successfully. Signature: ' + signature;
        } else {
          this.message = 'Failed to sign the message.';
        }
      },
      error: (error) => {
        console.error('Error in connect: ', error);
        this.message = 'An error occurred: ' + error.message;
      }
    });
  }
}
