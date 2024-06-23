// selectors/expense.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState, Expense } from '../../models/expense';

const selectExpenseState = (state: AppState) => state;

export const selectSelectedExpense = createSelector(
  selectExpenseState,
  (state: AppState) => state.selectedExpense
);

export const selectExpenseLoading = createSelector(
  selectExpenseState,
  (state: AppState) => state.loading
);

export const selectExpenseError = createSelector(
  selectExpenseState,
  (state: AppState) => state.error
);
