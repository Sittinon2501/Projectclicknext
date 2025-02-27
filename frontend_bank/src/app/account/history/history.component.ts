import { Component } from '@angular/core';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  transactions: any[] = [];
  message: string = '';
  selectedTransaction: any = null; // To store the selected transaction for the modal

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

  openModal(transaction: any) {
    this.selectedTransaction = transaction;
    transaction.showDetails = !transaction.showDetails; // Toggle details visibility
  }

  closeModal() {
    if (this.selectedTransaction) {
      this.selectedTransaction.showDetails = false; // Hide details when modal is closed
      this.selectedTransaction = null; // Clear selected transaction
    }
  }
}
