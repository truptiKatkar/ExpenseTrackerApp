import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common-components/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { SharedModule } from './components/shared/shared.module';
import { expenseReducer } from './store/reducers/expense-management.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ExpenseEffects } from './store/effects/expense-management.effects';

const dbConfig: DBConfig = {
  name: 'ExpenseTrackerDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'expense',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'description',
          keypath: 'description',
          options: { unique: false },
        },
        { name: 'amount', keypath: 'amount', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
        { name: 'category', keypath: 'category', options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ expenses: expenseReducer }, {}),
    StoreModule.forFeature('expenses', expenseReducer),
    EffectsModule.forRoot([ExpenseEffects]),
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
