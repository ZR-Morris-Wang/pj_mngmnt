import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskInput } from '../model/task.type';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private port = 8000;
  private baseURL = `http://localhost:${this.port}/tasks`;


  getAllTasks() {
    return this.http.get<Array<Task>>(this.baseURL);
  }

  getTasks(id?: number) {
    let url = this.baseURL;
    if (id) {
      url = this.baseURL + `/${id}`;
    } else {
      url = this.baseURL;
    }
    console.log(url);
    return this.http.get<Array<Task>>(url);
  }

  postTasks(task: TaskInput) {
    return this.http.post<TaskInput>(this.baseURL, task);
  }
}
