import { Component, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { TaskInput } from '../../model/task.type';
import { NewProjectComponent } from '../../dialogs/new-project/new-project.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

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
    body: "DUMMY BODY"
  }

  taskService = inject(TaskService);

  postTask() {
    this.taskService.postTasks(this.dummyData).subscribe(task => { console.log(task);})
    console.log("Home clicked");
  }

  addProject(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      width: '70%',
      height: '50%',
      data: {message: "New Project"}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed");
    })
  }

  constructor(public dialog: MatDialog) {}
}
