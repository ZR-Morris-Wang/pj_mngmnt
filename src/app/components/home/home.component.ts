import { Component, signal, inject } from '@angular/core';
import type { Task, Project } from '../../model/task.type';
import { TaskService } from '../../service/task.service';
import { ProjectService } from '../../service/project.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-home',
  imports: [MatDivider],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  taskItems = signal<Array<Task>>([]);
  taskService = inject(TaskService);
  projectItems = signal<Array<Project>>([]);
  projectService = inject(ProjectService);

  getTasks(): void {
    this.taskService.getTasks().subscribe( tasks => { console.log(tasks); this.taskItems.set(tasks)});
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe( projects => { console.log(projects); this.projectItems.set(projects)});  
  }
}
