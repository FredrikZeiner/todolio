import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodoItem } from './todo-item.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Output() itemDeleted = new EventEmitter<ITodoItem>();
  @Output() itemArchived = new EventEmitter<ITodoItem>();
  @Output() itemPutBack = new EventEmitter<ITodoItem>();
  @Output() isEditing = new EventEmitter<ITodoItem>();
  @Output() completeEdit = new EventEmitter();
  @Output() updateText = new EventEmitter<ITodoItem>();
  @Output() toggleDragging = new EventEmitter<{
    id: string;
    disabled: boolean;
  }>();
  @Input() id: string;
  @Input() text: string;
  @Input() completeable = true;
  @Input() editable = true;
  @Input() revivable = true;
  isDone = false;
  isDeleted = false;

  activateDragging() {
    this.toggleDragging.emit({ id: this.id, disabled: false });
  }

  disableDragging() {
    this.toggleDragging.emit({ id: this.id, disabled: true });
  }

  startEdit() {
    this.isEditing.emit({ id: this.id, text: this.text });
  }

  stopEdit(event) {
    event.srcElement.blur();
    this.activateDragging();
    this.completeEdit.emit({ id: this.id, text: event.target.innerText });
  }

  changeText(text: string) {
    this.updateText.emit({ id: this.id, text });
  }

  delete() {
    this.isDeleted = true;
    setTimeout(
      () => this.itemDeleted.emit({ id: this.id, text: this.text }),
      150
    );
  }

  archive() {
    this.isDone = true;
    setTimeout(
      () => this.itemArchived.emit({ id: this.id, text: this.text }),
      150
    );
  }

  putBack() {
    this.isDone = true;
    setTimeout(
      () => this.itemPutBack.emit({ id: this.id, text: this.text }),
      150
    );
  }
}
