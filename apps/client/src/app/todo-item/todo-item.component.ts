import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodoItem } from './todo-item.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Output() itemDeleted = new EventEmitter<ITodoItem>();
  @Output() isEditing = new EventEmitter<ITodoItem>();
  @Output() completedEdit = new EventEmitter<ITodoItem>();
  @Output() changedText = new EventEmitter<ITodoItem>();
  @Input() id: string;
  @Input() text: string;
  isDone = false;
  isDeleted = false;

  startEdit() {
    this.isEditing.emit({ id: this.id, text: this.text });
  }

  stopEdit(event, shouldBlur) {
    event.preventDefault();
    if (shouldBlur) event.srcElement.blur();
    this.completedEdit.emit({ id: this.id, text: this.text });
  }

  updateText(text: string) {
    this.changedText.emit({ id: this.id, text });
  }

  complete() {
    this.isDone = true;
    this.delete();
  }

  delete() {
    this.isDeleted = true;
    setTimeout(
      () => this.itemDeleted.emit({ id: this.id, text: this.text }),
      150
    );
  }
}
