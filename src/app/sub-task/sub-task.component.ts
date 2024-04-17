import { Component, Input, inject } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SubTask } from '../models/subTask.model';
import { Task } from '../models/task.model';
import { SubTaskService } from '../service/subTask.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sub-task',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  providers: [SubTaskService],
  templateUrl: './sub-task.component.html',
  styleUrl: './sub-task.component.scss'
})
export class SubTaskComponent {
  @Input() subTasks!: SubTask[];
  @Input() task!: Task;

  subTaskService = inject(SubTaskService);
  toastr = inject(ToastrService);

  reloadSubTasks() {
    this.subTaskService.getSubTasksByTaskId(this.task.id).subscribe(
      (subtasks) => {
        console.log(this.task.id);
        this.subTasks = subtasks;
      },
      (error) => {
        this.toastr.error('Błąd podczas pobierania podzadań');
      }
    );
  }

  deleteSubTask(subTaskId: number) {
    this.subTaskService.deleteSubTask(subTaskId).subscribe(
      (resonse) => {
        this.reloadSubTasks();
      },
      () => {
        this.toastr.error('Błąd podczas usuwania podzadania');
      }
    );
  }

  addSubTask(name: string) {
    this.subTaskService.addSubtask(name, this.task.id).subscribe(
      (response) => {
        this.reloadSubTasks();
      },
      (error) => {
        this.toastr.error('Błąd podczas dodawania podzadania');
      }
    );
  }

}
