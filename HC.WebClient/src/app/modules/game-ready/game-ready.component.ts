import { Component } from '@angular/core';
import { SmartContractService } from '../../services/smart-contract.service';

@Component({
  templateUrl: './game-ready.component.html',
  styleUrls: ['./game-ready.component.scss']
})
export class GameReadyComponent {

  constructor(private smartContractService: SmartContractService) { }

  readyToFight() {
    this.smartContractService.readyToFight().subscribe({
      next: (result) => {
        if (result !== null) {
          console.log('Ready to fight!');
        }
      },
      error: (error) => {
        console.error('Error occurred while getting ready to fight', error);
      }
    });
  }
}
