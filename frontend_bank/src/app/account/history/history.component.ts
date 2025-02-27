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
  message: string = '';

  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    this.getTransactionHistory();
  }

  getTransactionHistory() {
    this.bankService.getTransactionHistory().subscribe({
      next: (res) => {
        this.transactions = res.transactions;
        // Initialize showDetails flag for each transaction
        this.transactions.forEach(transaction => {
          transaction.showDetails = false; // initially hide details
        });
      },
      error: (err) => {
        this.message = err.error.message || 'Error fetching transaction history';
      },
    });
  }

  toggleDetails(transaction: any) {
    transaction.showDetails = !transaction.showDetails;
  }
}
