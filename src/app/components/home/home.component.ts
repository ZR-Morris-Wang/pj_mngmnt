import { Component, signal, inject } from '@angular/core';
import type { Task } from '../../model/task.type';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  taskItems = signal<Array<Task>>([]);
  taskService = inject(TaskService);

  getTasks(): void {
    this.taskService.getTasks().subscribe( tasks => { console.log(tasks); this.taskItems.set(tasks)});
  }

}
