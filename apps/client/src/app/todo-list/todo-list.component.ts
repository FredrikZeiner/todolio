import { Component, OnInit } from '@angular/core';
import { ITodoItem } from '../todo-item/todo-item.model';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuid } from 'uuid';

import { StorageService } from '../storage/storage.service';

const handle = (error) => console.log(error);

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: ITodoItem[] = [];
  form = new FormControl('');

  constructor(private storage: StorageService) {}

  async ngOnInit() {
    await this.refresh().catch(handle);
  }

  public disableDrag(item: ITodoItem) {
    const todo = this.todos.find((todo) => todo.id === item.id);
    todo.isEditing = true;
  }

  public completeEdit(item: ITodoItem) {
    const todo = this.todos.find((todo) => todo.id === item.id);
    todo.isEditing = false;
  }

  public undoDelete() {
    console.log('here');
  }

  public async add() {
    const newTodoText = this.form.value?.trim();
    if (newTodoText) {
      await this.storage.todos.put({
        id: uuid(),
        text: newTodoText,
        index: this.todos.length,
      });
      await this.refresh().catch(handle);
      this.form.reset();
    }
  }

  public async updateText(item: ITodoItem) {
    const todo = this.todos.find((todo) => todo.id === item.id);
    await this.storage.todos.update(todo.id, { text: item.text }).catch(handle);
  }

  public async delete(item: ITodoItem) {
    await this.storage.todos.delete(item.id).catch(handle);
    await this.refresh().catch(handle);
  }

  public async drop(event: CdkDragDrop<string[]>) {
    if (event) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      await this.update().catch(handle);
    }
  }

  private async refresh() {
    this.todos = await this.storage.todos.orderBy('index').toArray();
    await this.update().catch(handle);
  }

  private async update() {
    this.todos = this.todos.map((todo, i) => ({
      ...todo,
      isEditing: false,
      index: i,
    }));
    await this.storage.todos.bulkPut(this.todos).catch(handle);
  }
}