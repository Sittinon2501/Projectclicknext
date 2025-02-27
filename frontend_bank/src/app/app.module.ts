import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { OpenAccountComponent } from './account/open-account/open-account.component';
import { TransactionsComponent } from './account/transactions/transactions.component';
import { BalanceComponent } from './account/balance/balance.component';
import { HistoryComponent } from './account/history/history.component';
import { DashboardComponent } from './account/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    OpenAccountComponent,
    TransactionsComponent,
    BalanceComponent,
    HistoryComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
