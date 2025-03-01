import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskInput } from '../model/task.type';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private port = 8000;
  private url = `http://localhost:${this.port}/tasks`;

  getTasks() {
    return this.http.get<Array<Task>>(this.url);
  }

  postTasks(task: TaskInput) {
    return this.http.post<TaskInput>(this.url, task);
  }
}
