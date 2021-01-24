import { Component, OnInit } from '@angular/core';
import { ITodoItem } from '../todo-item/todo-item.model';
import { FormControl } from '@angular/forms';

import { StorageService } from '../storage/storage.service';
import { TodoStatus } from '../../types';

const handle = (error) => console.log(error);

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.scss'],
})
export class ArchiveListComponent implements OnInit {
  todos: ITodoItem[] = [];
  form = new FormControl('');

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.refresh().catch(handle);
  }

  public async putBack(item: ITodoItem) {
    await this.storage.todos
      .update(item.id, { status: TodoStatus.ACTIVE, updatedAt: new Date() })
      .catch(handle);
    await this.refresh().catch(handle);
    await this.reindex().catch(handle);
  }

  public async delete(item: ITodoItem) {
    await this.storage.todos
      .update(item.id, { status: TodoStatus.DELETED, updatedAt: new Date() })
      .catch(handle);
    await this.refresh().catch(handle);
    await this.reindex().catch(handle);
  }

  private async refresh() {
    this.todos = await this.storage.todos
      .where({
        status: TodoStatus.ARCHIVED,
      })
      .sortBy('updatedAt');
  }

  private async reindex() {
    const todos = this.todos.map((todo, i) => ({
      ...todo,
      index: i,
    }));

    await this.storage.todos.bulkPut(todos).catch(handle);
  }
}
