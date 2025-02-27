import { Component } from '@angular/core';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  accountNumber = ''; // เปลี่ยนจาก accountId เป็น accountNumber
  amount = 0;
  recipientAccountNumber = '';
  description = ''; // เพิ่มตัวแปร description
  message = '';
  transactionType: 'deposit' | 'withdraw' | 'transfer' = 'deposit'; // ใช้เพื่อเลือกประเภทของการทำรายการ

  constructor(private bankService: BankService) {}

  deposit() {
    this.bankService.deposit({ accountNumber: this.accountNumber, amount: this.amount }).subscribe({
      next: (res) => (this.message = res.message),
      error: (err) => (this.message = err.error.message),
    });
  }

  withdraw() {
    this.bankService.withdraw({ accountNumber: this.accountNumber, amount: this.amount }).subscribe({
      next: (res) => (this.message = res.message),
      error: (err) => (this.message = err.error.message),
    });
  }

  transfer() {
    this.bankService.transfer({
      recipientAccountNumber: this.recipientAccountNumber,
      amount: this.amount,
      description: this.description // ส่งคำอธิบายไปด้วย
    }).subscribe({
      next: (res) => (this.message = res.message),
      error: (err) => (this.message = err.error.message),
    });
  }

  // เลือกประเภทการทำรายการ
  selectTransactionType(type: 'deposit' | 'withdraw' | 'transfer') {
    this.transactionType = type;
  }
}
