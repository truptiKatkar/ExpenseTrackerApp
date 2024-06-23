import { createAction, props } from '@ngrx/store';
import { Expense } from '../../models/expense';

export const addExpense = createAction(
  '[Expense] Add Expense',
  props<{ expense: Expense }>()
);

export const addExpenseSuccess = createAction(
  '[Expense] Add Expense Success',
  props<{ key: any }>()
);

export const addExpenseFailure = createAction(
  '[Expense] Add Expense Failure',
  props<{ error: any }>()
);

export const updateExpense = createAction(
  '[Expense] Update Expense',
  props<{ expense: Expense }>()
);

export const updateExpenseSuccess = createAction(
  '[Expense] Update Expense Success',
  props<{ key: any }>()
);

export const updateExpenseFailure = createAction(
  '[Expense] Uodate Expense Failure',
  props<{ error: any }>()
);

export const deleteExpense = createAction(
  '[Expense] Delete Expense',
  props<{ expense: Expense }>()
);

export const deleteExpenseSuccess = createAction(
  '[Expense] Delete Expense Success',
  props<{ key: any }>()
);

export const deleteExpenseFailure = createAction(
  '[Expense] Delete Expense Failure',
  props<{ error: any }>()
);

export const getExpenseById = createAction(
  '[Expense] Get Expense By Id',
  props<{ expenseId: number }>()
);

export const getExpenseByIdSuccess = createAction(
  '[Expense] Get Expense By Id Success',
  props<{ expense: Expense }>()
);

export const getExpenseByIdFailure = createAction(
  '[Expense] Get Expense By Id Failure',
  props<{ error: any }>()
);
