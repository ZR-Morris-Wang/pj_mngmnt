import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Task, TaskInput } from '../model/task.type';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  http = inject(HttpClient);
  private port = 8000;
  private url = `http://localhost:${this.port}/heroes`;

  getTasks() {
    return this.http.get<Array<Task>>(this.url);
  }

  postTasks(body: TaskInput) {
    return this.http.post<TaskInput>(this.url, body);
  }
}
