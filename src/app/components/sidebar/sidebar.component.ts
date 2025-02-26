import { Component, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { TaskInput } from '../../model/task.type';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterOutlet, RouterLink, RouterLinkActive, RouterLinkWithHref],
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
}
