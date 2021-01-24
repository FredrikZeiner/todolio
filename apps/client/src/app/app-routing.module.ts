import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ArchiveListComponent } from './archive-list/archive-list.component';
import { TrashListComponent } from './trash-list/trash-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'todos',
        },
        {
          path: 'todos',
          component: TodoListComponent,
        },
        {
          path: 'archive',
          component: ArchiveListComponent,
        },
        {
          path: 'trash',
          component: TrashListComponent,
        },
      ],
      { useHash: true }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
