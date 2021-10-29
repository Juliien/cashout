import { Component, OnInit } from '@angular/core';
import {AccountModel} from "../../models/account.model";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  nickname: string = '';

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.accountService.getAccount()) {
      this.router.navigate(['game']).then();
    }
  }

  createAccount(): void {
    const form: AccountModel = {
      nickname: this.nickname,
      cash: 500
    }
    this.accountService.createAccount(form);
    this.router.navigate(['game']).then();
  }
}
