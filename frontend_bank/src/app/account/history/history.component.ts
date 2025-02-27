import { Component } from '@angular/core';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  transactions: any[] = [];
  message = '';

  constructor(private bankService: BankService) {}

  getTransactionHistory() {
    this.bankService.getTransactionHistory().subscribe({
      next: (res) => {
        this.transactions = res.transactions;
        this.message = '';
      },
      error: (err) => {
        this.message = err.error.message || 'Error fetching transactions';
      },
    });
  }
}
