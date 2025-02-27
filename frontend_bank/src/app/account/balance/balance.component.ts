import { Component } from '@angular/core';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-balance',
  standalone: false,
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {
balance: number | null = null;
  message = '';

  constructor(private bankService: BankService) {}

  getBalance() {
    this.bankService.getBalance().subscribe({
      next: (res) => {
        this.balance = res.balance;
        this.message = '';
      },
      error: (err) => {
        this.message = err.error.message || 'Error fetching balance';
      },
    });
  }
}
