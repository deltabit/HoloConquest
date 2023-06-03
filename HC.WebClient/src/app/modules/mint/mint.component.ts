import { Component, OnInit } from '@angular/core';
import { MetaDataServerService } from '../../services/meta-data-server.service';
import { MetamaskService } from '../../services/metamask.service';

@Component({
  selector: 'app-mint',
  templateUrl: './mint.component.html',
  styleUrls: ['./mint.component.scss']
})
export class MintComponent implements OnInit {

  playerAddress: string = '';  // initialize the playerAddress

  constructor(private metaDataServerService: MetaDataServerService, private metamaskService: MetamaskService) { }

  ngOnInit() {
    // assuming MetamaskService has a method getCurrentAccount() which returns the currently connected account.
    this.playerAddress = this.metamaskService.getCurrentAccount();
  }

  mint() {
    this.metaDataServerService.mint(this.playerAddress).subscribe(result => {
      console.log('Mint result:', result);
    });
  }
}
