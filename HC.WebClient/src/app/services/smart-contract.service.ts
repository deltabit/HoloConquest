import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MetamaskService } from './metamask.service';
declare let window: any;
import Web3 from 'web3';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {
  private web3: any;
  private contractAddress = environment.blockchain.contract.address;
  private abi = JSON.parse(environment.blockchain.contract.abi);

  constructor(private metamaskService: MetamaskService) {
    this.web3 = new Web3(window.ethereum);
  }

  readyToFight(): Observable<string | null> {
    const contract = new this.web3.eth.Contract(this.abi, this.contractAddress);
    const data = contract.methods.readyToFight().encodeABI();

    return this.metamaskService.sendTransaction(this.contractAddress, data).pipe(
      catchError(() => {
        console.log('Error occurred while invoking readyToFight');
        return of(null);
      })
    );
  }

  mint(playerAddress: string): Observable<any> {
    const contract = new this.web3.eth.Contract(this.abi, this.contractAddress);
    const data = contract.methods.mint(argument1, argument2, argument3, argument4, argument5, argument6, playerAddress).encodeABI();

    return this.metamaskService.sendTransaction(this.contractAddress, data).pipe(
      catchError(() => {
        console.log('Error occurred while minting');
        return of(null);
      })
    );
}

}
