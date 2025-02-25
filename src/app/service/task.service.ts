import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Task } from '../model/task.type';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  http = inject(HttpClient);

  getTasks() {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    return this.http.get<Array<Task>>(url);
  }
}
