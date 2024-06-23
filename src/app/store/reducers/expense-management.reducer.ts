// reducers/expense.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { AppState, Expense } from '../../models/expense'; // Adjust path as per your implementation
import * as ExpenseActions from '../actions/expense-management.actions';

const initialState: AppState = {
  expenses: [],
  selectedExpense: null,
  loading: false,
  error: null,
};

const _expenseReducer = createReducer(
  initialState,
  on(ExpenseActions.addExpenseSuccess, (state, { key }) => ({
    ...state,
    expenses: [
      ...state.expenses,
      { id: key, description: '', amount: 0, category: '' },
    ],
  })),
  on(ExpenseActions.addExpenseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ExpenseActions.updateExpenseSuccess, (state, { key }) => ({
    ...state,
    expenses: [
      ...state.expenses,
      { id: key, description: '', amount: 0, category: '' },
    ],
  })),
  on(ExpenseActions.updateExpenseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ExpenseActions.deleteExpenseSuccess, (state, { key }) => ({
    ...state,
    expenses: state.expenses.filter((expense) => expense.id !== key),
  })),
  on(ExpenseActions.deleteExpenseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ExpenseActions.getExpenseById, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedExpense: null,
  })),
  on(ExpenseActions.getExpenseByIdSuccess, (state, { expense }) => ({
    ...state,
    loading: false,
    selectedExpense: expense,
  })),
  on(ExpenseActions.getExpenseByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function expenseReducer(
  state: AppState | undefined = initialState,
  action: Action
): AppState {
  return _expenseReducer(state, action);
}
