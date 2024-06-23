import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseManagementRoutingModule } from './expense-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ExpenseManagementComponent } from './expense-management.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';

@NgModule({
  declarations: [
    ExpenseManagementComponent,
    ExpenseListComponent,
    AddExpenseComponent,
  ],
  imports: [CommonModule, ExpenseManagementRoutingModule, SharedModule],
})
export class ExpenseManagementModule {}
