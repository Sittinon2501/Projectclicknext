import { Component } from '@angular/core';
import { BankService } from '../../service/bank.service';
import Swal from 'sweetalert2'; // นำเข้า SweetAlert2

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  accountNumber = '';
  amount = 0;
  recipientAccountNumber = '';
  description = ''; // เพิ่มตัวแปร description
  transactionType: 'deposit' | 'withdraw' | 'transfer' = 'deposit';

  constructor(private bankService: BankService) {}

  deposit() {
    // Deposit: ส่ง accountNumber, amount และ description
    this.bankService.deposit({
      accountNumber: this.accountNumber,
      amount: this.amount,
      description: this.description // ส่งข้อมูล description ด้วย
    }).subscribe({
      next: (res) => this.showSuccessAlert(res.message),
      error: (err) => this.showErrorAlert(err.error.message),
    });
  }

  withdraw() {
    // Withdraw: ส่ง accountNumber, amount และ description
    this.bankService.withdraw({
      accountNumber: this.accountNumber,
      amount: this.amount,
      description: this.description // ส่งข้อมูล description ด้วย
    }).subscribe({
      next: (res) => this.showSuccessAlert(res.message),
      error: (err) => this.showErrorAlert(err.error.message),
    });
  }

  transfer() {
    // Transfer: ส่ง recipientAccountNumber, amount, และ description
    this.bankService.transfer({
      recipientAccountNumber: this.recipientAccountNumber,
      amount: this.amount,
      description: this.description // ส่งข้อมูล description ด้วย
    }).subscribe({
      next: (res) => this.showSuccessAlert(res.message),
      error: (err) => this.showErrorAlert(err.error.message),
    });
  }

  // แสดง SweetAlert2 เมื่อสำเร็จ
  showSuccessAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      confirmButtonText: 'OK'
    });
  }

  // แสดง SweetAlert2 เมื่อเกิดข้อผิดพลาด
  showErrorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonText: 'Try Again'
    });
  }

  // เลือกประเภทการทำรายการ
  selectTransactionType(type: 'deposit' | 'withdraw' | 'transfer') {
    this.transactionType = type;
  }
}
