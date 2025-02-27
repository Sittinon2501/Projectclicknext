import { Component } from '@angular/core';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  accountId = '';
  amount = 0;
  recipientAccountNumber = '';
  message = '';

  constructor(private bankService: BankService) {}

  deposit() {
    this.bankService.deposit({ accountId: this.accountId, amount: this.amount }).subscribe({
      next: (res) => (this.message = res.message),
      error: (err) => (this.message = err.error.message),
    });
  }

  withdraw() {
    this.bankService.withdraw({ accountId: this.accountId, amount: this.amount }).subscribe({
      next: (res) => (this.message = res.message),
      error: (err) => (this.message = err.error.message),
    });
  }

  transfer() {
    this.bankService.transfer({ recipientAccountNumber: this.recipientAccountNumber, amount: this.amount }).subscribe({
      next: (res) => (this.message = res.message),
      error: (err) => (this.message = err.error.message),
    });
  }
}