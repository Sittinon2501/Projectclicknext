import { Component } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  accounts: any[] = [];
  message: string = '';
  balance: number | null = null;

  constructor(
    private accountService: AccountService,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    this.loadUserAccounts();
    this.loadBalance();
  }

  loadUserAccounts() {
    this.accountService.getUserAccounts().subscribe({
      next: (res) => {
        this.accounts = res.accounts;
      },
      error: (err) => {
        this.message = err.error.message || 'Error fetching account details';
      },
    });
  }

  loadBalance() {
    this.bankService.getBalance().subscribe({
      next: (res) => {
        this.balance = res.balance;
      },
      error: (err) => {
        this.message = err.error.message || 'Error fetching balance';
      },
    });
  }

  calculateAnnualInterest(account: any): number {
    return (account.balance * account.interestRate) / 100;
  }
}
