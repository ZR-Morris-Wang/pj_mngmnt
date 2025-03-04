import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Task, testType } from '../../model/task.type';
import { TaskService } from '../../service/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-task',
  imports: [MatButtonModule, MatDivider],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  
  taskObj: testType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskComponent>) {
    this.taskObj = {
      id: 0,
      title: '',
      description: '',
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
