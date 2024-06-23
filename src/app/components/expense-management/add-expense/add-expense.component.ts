import { Component, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { merge } from 'rxjs';
import {
  addExpense,
  getExpenseById,
  updateExpense,
} from '../../../store/actions/expense-management.actions';
import { Expense } from '../../../models/expense';
import { ActivatedRoute } from '@angular/router';
import {
  selectExpenseError,
  selectExpenseLoading,
  selectSelectedExpense,
} from '../../../store/selector/expense-management.selector';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent implements OnInit {
  description = new FormControl('', [Validators.required]);
  amount = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  errorMessage = signal('');
  expenseList = [{}];
  expenseId!: number;
  selectedExpense!: Expense | null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private dbService: NgxIndexedDBService,
    public location: Location
  ) {
    merge(this.description.statusChanges, this.description.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      console.log(param, 'param');
      this.expenseId = Number(param['id']);
    });
    if (this.expenseId) {
      this.getExpenseById();
      // this.store.pipe(select(selectSelectedExpense)).subscribe((expense) => {
      //   if (expense) this.selectedExpense = expense;
      // });
      // this.store.pipe(select(selectExpenseLoading)).subscribe((loading) => {});
      // this.store.pipe(select(selectExpenseError)).subscribe((error) => {});
    }
  }

  getExpenseById() {
    this.dbService
      .getByKey('expense', this.expenseId)
      .subscribe((expense: any) => {
        console.log(expense);
        this.selectedExpense = expense;
        this.description.patchValue(expense.description);
        this.amount.patchValue(expense.amount);
        this.date.patchValue(expense.date);
        this.category.patchValue(expense.category);
      });
    // this.store.dispatch(getExpenseById({ expenseId: this.expenseId }));
  }

  updateErrorMessage() {
    if (this.description.hasError('required')) {
      this.errorMessage.set('This field is required');
    } else {
      this.errorMessage.set('');
    }
  }

  handleAddExpense() {
    let expense: Expense = {
      description: this.description.value || '',
      amount: Number(this.amount.value) || 0,
      date: this.date.value ? new Date(this.date.value).toISOString() : '',
      category: this.category.value || '',
    };
    if (!this.expenseId) this.store.dispatch(addExpense({ expense }));
    else {
      expense.id = this.selectedExpense?.id;
      this.store.dispatch(updateExpense({ expense }));
    }
  }
}
