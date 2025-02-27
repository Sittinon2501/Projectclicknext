import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { OpenAccountComponent } from './account/open-account/open-account.component';
import { TransactionsComponent } from './account/transactions/transactions.component';
import { BalanceComponent } from './account/balance/balance.component';
import { HistoryComponent } from './account/history/history.component';

const routes: Routes = [
  { path: 'open-account', component: OpenAccountComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'balance', component: BalanceComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' }, // ถ้าเส้นทางไม่ตรงให้ไปหน้า Login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
