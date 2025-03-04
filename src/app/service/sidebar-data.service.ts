import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { signal } from '@angular/core';
import { Project } from '../model/task.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarDataService {
  constructor(private projectService: ProjectService) { }

  // projectItems = signal<Array<Project>>([]);
  projectItems = new BehaviorSubject<Array<Project>>([]);
  observableProjectItems = this.projectItems.asObservable();

  getSidebarData() {
    return this.projectService.getProjects();
  }

  get projects() {
    return this.projectItems.getValue();
  }

  updateProjectItems(projects: Array<Project>) {
    this.projectItems.next(projects);
  }
}
