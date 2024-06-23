import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ExpenseActions from '../actions/expense-management.actions';
import { Key, NgxIndexedDBService } from 'ngx-indexed-db';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ExpenseEffects {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.addExpense),
      mergeMap((action) =>
        this.dbService.add('expense', action.expense).pipe(
          map((key: any) => ExpenseActions.addExpenseSuccess({ key })),
          catchError((error) =>
            of(ExpenseActions.addExpenseFailure({ error }))
          ),
          tap(() => this.showSnackbar('Expense added successfully'))
        )
      )
    )
  );

  updateExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.updateExpense),
      mergeMap((action) =>
        this.dbService.update('expense', action.expense).pipe(
          map((key: any) => ExpenseActions.updateExpenseSuccess({ key })),
          catchError((error) =>
            of(ExpenseActions.updateExpenseFailure({ error }))
          ),
          tap(() => this.showSnackbar('Expense updated successfully'))
        )
      )
    )
  );

  deleteExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.deleteExpense),
      filter((action) => !!action.expense.id),
      mergeMap((action) =>
        this.dbService.delete('expense', action.expense.id as Key).pipe(
          map(() =>
            ExpenseActions.deleteExpenseSuccess({ key: action.expense.id })
          ),
          catchError((error) =>
            of(ExpenseActions.deleteExpenseFailure({ error }))
          ),
          tap(() => this.showSnackbar('Expense deleted successfully'))
        )
      )
    )
  );

  getExpenseById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.getExpenseById),
      mergeMap((action) =>
        this.dbService.getByKey('expense', action.expenseId).pipe(
          map((expense: any) =>
            ExpenseActions.getExpenseByIdSuccess({ expense })
          ),
          catchError((error) =>
            of(ExpenseActions.getExpenseByIdFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dbService: NgxIndexedDBService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  private showSnackbar(message: string): void {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
    this.router.navigate(['/list']);
  }
}
