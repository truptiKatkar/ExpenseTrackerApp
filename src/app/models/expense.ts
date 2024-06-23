export interface Expense {
  id?: number;
  description: string;
  amount: number;
  date?: string;
  category: string;
}

export interface AppState {
  expenses: Expense[];
  selectedExpense?: Expense | null;
  loading: boolean;
  error: any;
}