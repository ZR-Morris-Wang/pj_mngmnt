import { Component, inject, Output, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { TaskInput } from '../../model/task.type';
import { NewProjectComponent } from '../../dialogs/new-project/new-project.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import type { Project, Task } from '../../model/task.type';
import { SidebarDataService } from '../../service/sidebar-data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterOutlet, RouterLink, RouterLinkWithHref],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  opened = signal(true);
  basedir = '/projects';


  
  private dummyData : TaskInput = {
    userId: 1,
    title: "DUMMY TITLE",
    projectId: 1,
    description: "DUMMY DESCRIPTION"
  }

  taskService = inject(TaskService);
  sidebarDataService = inject(SidebarDataService); 

  projectItems = signal<Array<Project>>([]);

  ngOnInit() {
    this.sidebarDataService.getSidebarData().subscribe(projects => {
      this.projectItems.set(projects);
    })
  }


  postTask() {
    this.taskService.postTasks(this.dummyData).subscribe(task => { console.log(task);})
    console.log("Home clicked");
  }

  addProject(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      width: '50%',
      height: '30%',
      data: {message: "New Project"}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed");
    })
  }

  identifyId(project: Project): number {
    console.log("ID: ", project.id);
    return project.id;
  }
  
  taskItems = signal<Array<Task>>([]);
  
  constructor(public dialog: MatDialog) {}
}
