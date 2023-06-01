import { Component } from '@angular/core';
import { SmartContractService } from '../../services/smart-contract.service';

@Component({
  templateUrl: './game-ready.component.html',
  styleUrls: ['./game-ready.component.scss']
})
export class GameReadyComponent {

  constructor(private smartContractService: SmartContractService) { }

  readyToFight() {
    this.smartContractService.readyToFight().subscribe(result => {
      if (result !== null) {
        console.log('Ready to fight!');
      }
    });
  }
}
