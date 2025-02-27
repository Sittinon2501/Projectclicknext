import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { TransactionsComponent } from './account/transactions/transactions.component';
import { DashboardComponent } from './account/dashboard/dashboard.component';
import { NotificationsComponent } from './account/notifications/notifications.component';

const routes: Routes = [
  { path: 'notifications', component: NotificationsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'home' }, // ถ้าเส้นทางไม่ตรงให้ไปหน้า Login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
