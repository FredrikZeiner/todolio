import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { ITodoItem } from '../todo-item/todo-item.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService extends Dexie {
  todos: Dexie.Table<ITodoItem, string>;
  constructor() {
    super('todolio-db');
    this.version(1).stores({
      todos: 'id,date,text,done,index',
    });
  }
}
