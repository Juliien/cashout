import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  value: number = 1.00;
  bet: number = 1;
  lastBest: number[] = []
  isStart: boolean = false;
  isCashOut: boolean = false;

  constructor(public accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    if(!this.accountService.getAccount()) {
      this.router.navigate(['home']).then();
    }
    if(this.accountService.currentAccount.cash === 0) {
      this.accountService.currentAccount.cash = 500;
      this.accountService.setAccount(this.accountService.currentAccount);
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async generateBet() {
    if(this.accountService.currentAccount.cash < this.bet) {
      alert("Vous n'avez pas asser de tune !")
      return;
    }
    this.isStart = true
    this.accountService.currentAccount.cash -= this.bet;
    this.accountService.setAccount(this.accountService.currentAccount);
    const rand = Math.floor(Math.random() * (10 * 100 - 100) + 100) / 100;
    let i = 1.00;
    for(i; i <= rand; i+=0.01) {
        this.value = i;
        await this.delay(100);
    }
    this.isStart = false
    this.isCashOut = false;
  }

  cashOut() {
    this.isStart = false;
    this.accountService.currentAccount.cash += this.bet * this.value
    this.accountService.setAccount(this.accountService.currentAccount);
    this.isCashOut = true;
  }
}
