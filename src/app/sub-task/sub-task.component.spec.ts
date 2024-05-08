import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskComponent } from './sub-task.component';
import { BoardComponent } from '../board/board.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

xdescribe('SubTaskComponent', () => {
  let component: SubTaskComponent;
  let fixture: ComponentFixture<SubTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubTaskComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideToastr(),
        provideAnimations(),

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const subtasks = [{
      id: 1,
      name: 'Subtask 1',
      finished: false,
      position: 1,
      color: 'red',
    }]
    component.subTasks = subtasks;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
