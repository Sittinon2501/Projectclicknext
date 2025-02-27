import { Component } from '@angular/core';
import { BankService } from '../../service/bank.service';
@Component({
  selector: 'app-open-account',
  standalone: false,
  templateUrl: './open-account.component.html',
  styleUrl: './open-account.component.css'
})
export class OpenAccountComponent {
  accountName = '';
  accountType = 'savings';
  initialDeposit = 0;
  fixedTermMonths: number | null = null;
  message = '';

  constructor(private bankService: BankService) {}

  openAccount() {
    const data = {
      accountName: this.accountName,
      accountType: this.accountType,
      initialDeposit: this.initialDeposit,
      fixedTermMonths: this.accountType === 'fixed_deposit' ? this.fixedTermMonths : null,
    };

    this.bankService.openAccount(data).subscribe({
      next: (res) => {
        this.message = res.message;
      },
      error: (err) => {
        this.message = err.error.message;
      },
    });
  }
}
