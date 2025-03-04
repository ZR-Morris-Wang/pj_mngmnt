import { Component } from '@angular/core';
import { ProjectInput, TaskInput } from '../../model/task.type';
import { ProjectService } from '../../service/project.service';
import { NewProjectComponent } from '../new-project/new-project.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../service/task.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-new-task',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatDivider],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  taskObj: TaskInput;

  constructor(
    private taskService: TaskService,
    private dialogRef: MatDialogRef<NewTaskComponent>) {
    this.taskObj = {
      userId: undefined,
      title: '',
      projectId: undefined,
      description: '',
    }
  }



  dummy1: TaskInput = {
    userId: 1,
    title: "DUMMY TITLE",
    projectId: 1,
    description: "DUMMY DESCRIPTION"
  }

  dummy2: TaskInput = {
    userId: 1,
    title: "DUMMY TITLE 2",
    projectId: 2,
    description: "DUMMY DESCRIPTION 2"
  }


  addTask(): void {   // Currently posting dummy tasks
    this.taskService.postTasks(this.dummy2).subscribe(tasks => console.log(tasks));
    this.dialogRef.close();
  }

  inputValue(): void {
    console.log(this.taskObj);
  }
  
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
