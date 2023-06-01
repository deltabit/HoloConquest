import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {

  constructor() { }

  checkMetamaskInstallation(): Observable<boolean> {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      return of(true);
    } else {
      console.log('MetaMask is not installed. Install it from https://metamask.io/');
      return of(false);
    }
  }

  connectWallet(): Observable<string | null> {
    return from(window.ethereum.request({ method: 'eth_requestAccounts' })).pipe(
      map((accounts: any) => (accounts as string[])[0]),
      catchError(() => {
        console.log('User rejected connection');
        return of(null);
      })
    );
  }

  signMessage(account: string, message: string = "Please sign this message to confirm your identity."): Observable<string | null> {
    return from(window.ethereum.request({
      method: 'personal_sign',
      params: [message, account],
    }) as Promise<string>).pipe(
      catchError(() => {
        console.log('User denied message signature');
        return of(null);
      })
    );
  }

  sendTransaction(to: string, data: string): Observable<string | null> {
    return from(window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: window.ethereum.selectedAddress,
        to: to,
        data: data,
      }],
    }) as Promise<string>).pipe(
      catchError(() => {
        console.log('User denied transaction signature');
        return of(null);
      })
    );
  }
}
