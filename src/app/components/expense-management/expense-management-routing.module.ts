import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseManagementComponent } from './expense-management.component';

const routes: Routes = [
  {
    path: '',
    component: ExpenseManagementComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ExpenseListComponent },
      { path: 'add', component: AddExpenseComponent },
      { path: 'edit/:id', component: AddExpenseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseManagementRoutingModule {}
