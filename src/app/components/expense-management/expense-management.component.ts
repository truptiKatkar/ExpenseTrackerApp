import { Component, OnInit, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { addExpense } from '../../store/actions/expense-management.actions';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-expense-management',
  templateUrl: './expense-management.component.html',
  styleUrl: './expense-management.component.scss',
})
export class ExpenseManagementComponent implements OnInit {
  readonly description = new FormControl('', [Validators.required]);
  readonly amount = new FormControl('', [Validators.required]);
  readonly date = new FormControl('', [Validators.required]);
  readonly category = new FormControl('', [Validators.required]);
  errorMessage = signal('');
  expenseList = [{}];
  constructor(
    private store: Store<any>,
    private dbService: NgxIndexedDBService
  ) {
    merge(this.description.statusChanges, this.description.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {}

  updateErrorMessage() {
    if (this.description.hasError('required')) {
      this.errorMessage.set('This field is required');
    } else {
      this.errorMessage.set('');
    }
  }

  handleAddExpense() {
    let expense = {
      description: this.description.value,
      amount: this.amount.value,
      date: this.date.value,
      category: this.category.value,
    };
    // this.dbService.add('expense', expense).subscribe((key) => {
    //   console.log('key: ', key);
    // });
    // this.store.dispatch(addExpense(expense));
  }
}
