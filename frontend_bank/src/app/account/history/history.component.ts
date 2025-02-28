import { Component } from '@angular/core';
import { BankService } from '../../service/bank.service';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  createdAt: string;
  description?: string;
  senderAccountNumber?: string;
  senderAccountName?: string;
  recipientAccountNumber?: string;
  recipientAccountName?: string;
  month?: string;
  showDetails?: boolean;
}

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  message: string = '';
  selectedTransaction: Transaction | null = null;
  selectedMonth: string = '';

  months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    this.getTransactionHistory();
  }

  getTransactionHistory() {
    this.bankService.getTransactionHistory().subscribe({
      next: (res) => {
        this.transactions = res.transactions.map((transaction: Transaction) => {
          const transactionDate = new Date(transaction.createdAt);
          const formattedMonth = (transactionDate.getMonth() + 1).toString().padStart(2, '0'); // MM

          return {
            ...transaction,
            month: formattedMonth,
            showDetails: false
          };
        });
        this.applyFilter();
      },
      error: (err) => {
        this.message = err.error.message || 'Error fetching transaction history';
      },
    });
  }

  applyFilter() {
    if (this.selectedMonth) {
      this.filteredTransactions = this.transactions.filter(
        (transaction: Transaction) => transaction.month === this.selectedMonth
      );
    } else {
      this.filteredTransactions = [...this.transactions];
    }
  }

  openModal(transaction: Transaction) {
    this.selectedTransaction = transaction;
    transaction.showDetails = !transaction.showDetails;
  }

  closeModal() {
    if (this.selectedTransaction) {
      this.selectedTransaction.showDetails = false;
      this.selectedTransaction = null;
    }
  }
}
