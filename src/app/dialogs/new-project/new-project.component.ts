import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { ProjectService } from '../../service/project.service';
import type { ProjectInput } from '../../model/task.type';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import type { ElementRef } from '@angular/core';

@Component({
  selector: 'app-new-project',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss'
})

export class NewProjectComponent {

projectObj: ProjectInput;

  constructor(
    private projectService: ProjectService,
    private dialogRef: MatDialogRef<NewProjectComponent>) {
    this.projectObj = {
      projectName: '',
    }
  }

  addProject(): void {
    this.projectService.postProjects(this.projectObj).subscribe(project => console.log(project));
    this.dialogRef.close();
  }

  inputValue(): void {
    console.log(this.projectObj);
  }
  
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
