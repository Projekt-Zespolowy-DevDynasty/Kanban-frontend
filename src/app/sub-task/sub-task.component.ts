import { Component, Input, inject } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SubTask } from '../models/subTask.model';
import { Task } from '../models/task.model';
import { SubTaskService } from '../service/subTask.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sub-task',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatCheckboxModule,
    MatProgressBarModule,
    FormsModule
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

  percentDone!: number;

  ngOnInit(): void {
    this.calculatePercentDone();
  }
  ngAfterViewInit(): void {
    this.calculatePercentDone();
  }

  calculatePercentDone() {
    const total = this.subTasks.length;
    const completed = this.subTasks.filter(st => st.finished).length;
    this.percentDone = total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  onCheckboxChange(subtaskId: number, event: any): void {
    this.subTaskService.changeSubTaskStatus(subtaskId, event.checked).subscribe(
      (response) => {
        this.reloadSubTasks();
      },
      (error) => {
        this.toastr.error('Błąd podczas zmiany statusu podzadania');
      }
    );
    this.calculatePercentDone();
  }

  reloadSubTasks() {
    this.subTaskService.getSubTasksByTaskId(this.task.id).subscribe(
      (subtasks) => {
        this.subTasks = subtasks;
        this.calculatePercentDone();
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
    this.calculatePercentDone();
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
    this.calculatePercentDone();
  }

}
