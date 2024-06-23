import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseManagementComponent } from './components/expense-management/expense-management.component';

const routes: Routes = [
  // { path: '', component: ExpenseManagementComponent },
  {
    path: '',
    loadChildren: () =>
      import('./components/expense-management/expense-management.module').then(
        (m) => m.ExpenseManagementModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
