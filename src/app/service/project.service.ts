import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, ProjectInput, Task } from '../model/task.type';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  private port = 8000;
  private url = `http://localhost:${this.port}/projects`;

  getProjects() {
    return this.http.get<Array<Project>>(this.url);
  }

  postProjects(project: ProjectInput) {
    return this.http.post<ProjectInput>(this.url, project);
  }

  getAllTasks(projectId: number) {
    return this.http.get<Array<Task>>(`${this.url}/${projectId}/tasks`);
  }
}
