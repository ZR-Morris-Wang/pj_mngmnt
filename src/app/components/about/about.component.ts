import { Component, signal } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { Project, Task, testType } from '../../model/task.type';
import { ProjectsComponent } from '../projects/projects.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewTaskComponent } from '../../dialogs/new-task/new-task.component';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskComponent } from '../../dialogs/task/task.component';

type data = Array<{}>;

@Component({
  selector: 'app-about',
  imports: [MatListModule, MatIconModule, MatDialogModule, CdkDropList, CdkDrag],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})



export class AboutComponent {

  drop(event: CdkDragDrop<testType[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, 
                      event.previousIndex, 
                      event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, 
                        event.container.data, 
                        event.previousIndex, 
                        event.currentIndex);
    }
    console.log(event.container.id);
  }




  constructor(private taskService: TaskService,
              private projectService: ProjectService,
              private dialog: MatDialog,
              private route: ActivatedRoute
  ) {}
  
  projectItems = signal<Array<Project>>([]);
  taskItems = signal<Array<Task>>([]);
  pageID: Number = 1;

  todo: Array<testType> = [];
  inProgress: Array<testType> = [];
  done: Array<testType> = [];
  pending: Array<testType> = [];

  ngOnInit() {
    // this.projectService.getProjects().subscribe(projects => {
    //   this.projectItems.set(projects);
    // })
    // this.getProjectTasks();
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      if(params.get('id') !== null) {
        this.pageID = parseInt(params.get('id')!);
        if(this.pageID === 1) {
          this.todo = this.todo1;
          this.inProgress = this.inProgress1;
          this.done = this.done1;
          this.pending = this.pending1;
        } else if(this.pageID === 2) {
          this.todo = this.todo2;
          this.inProgress = this.inProgress2;
          this.done = this.done2;
          this.pending = this.pending2;
        } else {
          this.todo = [];
          this.inProgress = [];
          this.done = [];
          this.pending = [];
        }
      }}
    );
  }
  
  addProject(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '50%',
      height: '45%',
      data: {message: "New Project"}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed");
    })
  }


  todo1: Array<testType> = [
    {
      id: 1,
      title: 'Get to work',
      description: 'Don\'t wanna work'
    },
    {
      id: 2,
      title: 'Pick up groceries',
      description: 'Shopping List: Milk'
    },
    {
      id: 3,
      title: 'Go Home',
      description: 'I ma outta here'
    },
    {
      id: 4,
      title: 'Fall asleep',
      description: 'Too sleepy'
    }
  ];

  inProgress1: Array<testType> = [];

  done1: Array<testType> = [
    {
      id: 1,
      title: 'Get up',
      description: 'No'
    },
    {
      id: 2,
      title: 'Brush teeth',
      description: 'Takes too long'
    },
    {
      id: 3,
      title: 'Take a shower',
      description: 'So nice'
    },
    {
      id: 4,
      title: 'Check e-mail',
      description: 'Too much email'
    },
    {
      id: 5,
      title: 'Walk dog',
      description: 'Doggo is cute'
    }
  ]

  pending1: Array<testType> = [
    {
      id: 1,
      title: 'Breakfast',
      description: 'idk what to eat'
    },
    {
      id: 2,
      title: 'Lunch',
      description: 'Maybe Poke'
    },
    {
      id: 3,
      title: 'Dinner',
      description: 'Beef noodles'
    },
    {
      id: 4,
      title: 'snack',
      description: 'Chips'
    }
  ]

  todo2: Array<testType> = [
    {
      id: 1,
      title: 'IC Contest',
      description: 'Have not even started yet.'
    }
  ];

  inProgress2: Array<testType> = [
    {
    id: 1,
    title: 'Second Round Interview with MS',
    description: 'Very Grateful'
    }
  ];

  done2: Array<testType> = [
    {
      id: 1,
      title: 'First Round Interview with MS',
      description: 'Thanks Jeffrey'
    }
  ]

  pending2: Array<testType> = [
    {
      id: 1,
      title: 'NTU Azalea Festival',
      description: 'Waiting for officers response'
    },
  ]


  openDetail(task: testType) {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '70%',
      height: '45%',
      data: {
        id: task.id,
        title: task.title,
        description: task.description
      }
    })
  
    dialogRef.afterClosed().subscribe(() => console.log("Task Dialog Closed"))
  
  }

  addTask() {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '70%',
      height: '70%'
    })

    dialogRef.afterClosed().subscribe(() => console.log("New Task Dialog Closed"));
  }

  dataSet: data = [{todo: this.todo, inProgress: this.inProgress, done: this.done, pending: this.pending}, {todo: this.todo, inProgress: this.inProgress, done:this.done, pending: this.pending}];


}
