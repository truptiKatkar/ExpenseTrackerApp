import { Component, OnInit } from '@angular/core';
import { Expense } from '../../../models/expense';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Store } from '@ngrx/store';
import { deleteExpense } from '../../../store/actions/expense-management.actions';

const ELEMENT_DATA: Expense[] = [
  {
    id: 1,
    description: 'Hydrogen',
    amount: 1.0079,
    category: 'H',
    date: 'Sun Jun 23 2024 20:20:34 GMT+0530 (India Standard Time)',
  },
  {
    id: 2,
    description: 'Helium',
    amount: 4.0026,
    category: 'He',
    date: 'Sun Jun 23 2024 20:20:34 GMT+0530 (India Standard Time)',
  },
  {
    id: 3,
    description: 'Lithium',
    amount: 6.941,
    category: 'Li',
    date: 'Sun Jun 23 2024 20:20:34 GMT+0530 (India Standard Time)',
  },
  {
    id: 4,
    description: 'Beryllium',
    amount: 9.0122,
    category: 'Be',
    date: 'Sun Jun 23 2024 20:20:34 GMT+0530 (India Standard Time)',
  },
  {
    id: 5,
    description: 'Boron',
    amount: 10.811,
    category: 'B',
    date: 'Sun Jun 23 2024 20:20:34 GMT+0530 (India Standard Time)',
  },
  {
    id: 6,
    description: 'Carbon',
    amount: 12.0107,
    category: 'C',
    date: 'Sun Jun 23 2024 20:20:34 GMT+0530 (India Standard Time)',
  },
  {
    id: 7,
    description: 'Nitrogen',
    amount: 14.0067,
    category: 'N',
    date: 'Sun Jun 23 2024 20:20:34 GMT+0530 (India Standard Time)',
  },
  {
    id: 8,
    description: 'Oxygen',
    amount: 15.9994,
    category: 'O',
    date: 'Sun Jun 23 2024 20:20:34 GMT+0530 (India Standard Time)',
  },
  {
    id: 9,
    description: 'Fluorine',
    amount: 18.9984,
    category: 'F',
    date: 'Sun Jun 23 2024 20:20:34 GMT+0530 (India Standard Time)',
  },
  {
    id: 10,
    description: 'Neon',
    amount: 20.1797,
    category: 'Ne',
    date: 'Sun Jun 23 2024 20:20:34 GMT+0530 (India Standard Time)',
  },
];

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'description',
    'amount',
    'category',
    'date',
    'action',
  ];
  dataSource: Expense[] = [];
  constructor(
    private dbService: NgxIndexedDBService,
    private store: Store<any>
  ) {}
  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses(): void {
    this.dbService.getAll('expense').subscribe((expenses: any) => {
      this.dataSource = expenses;
    });
  }

  handleExpenseDelete(expense: Expense): void {
    console.log(expense);
    this.store.dispatch(deleteExpense({ expense }));
    this.getExpenses();
  }
}
