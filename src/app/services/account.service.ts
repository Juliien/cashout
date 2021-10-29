import { Injectable } from '@angular/core';
import {AccountModel} from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentAccount: AccountModel = {nickname:'', cash:500};

  constructor() {
      const account = this.getAccount();
      if(account) {
        this.currentAccount = JSON.parse(account);
      }
  }

  getAccount(): string {
    return <string>localStorage.getItem('account');
  }

  setAccount(account: AccountModel){
    localStorage.setItem('account', JSON.stringify(account));
  }

  createAccount(account: AccountModel) {
    this.currentAccount = account;
    this.setAccount(account);
  }
}
