import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { BoardComponent } from '../board/board.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideToastr } from 'ngx-toastr';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CardsService } from '../service/cards.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let de: DebugElement;
  let cardsServiceSpy: jasmine.SpyObj<CardsService>;

  beforeEach(async () => {
    cardsServiceSpy = jasmine.createSpyObj('CardsService', ['deleteTask']);

    await TestBed.configureTestingModule({
      imports: [TaskComponent, DragDropModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideToastr(),
        provideAnimations(),
        { provide: CardsService, useValue: cardsServiceSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    cardsServiceSpy = TestBed.inject(CardsService) as jasmine.SpyObj<CardsService>;

    const card = {id: 1, name: 'Card 1', maxTasksLimit: 5, position: 1, tasks: []}
    component.card = card;
    const task = {id: 1, name: 'Task 1', color: 'red', position: 1, useers: [], subTasks: []}
    const task2 = {id: 2, name: 'Task 2', color: 'red', position: 2, useers: [], subTasks: []}
    component.sortedListOfTasks = [task, task2];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // change-name-button zmianaNazwyTaska  .cardService.zmianaNazwyTaska
  it('should call zmianaNazwyTaska', () => {
    spyOn(component, 'zmianaNazwyTaska');

    const btn = de.query(By.css('.change-name-button'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.zmianaNazwyTaska).toHaveBeenCalled();
  });


  // usunTask delete-task-button deleteTask
  it('should call deleteTask, refreshparent.emit', () => {
    spyOn(window, 'confirm').and.returnValue(true);
  
    const btn = de.query(By.css('.delete-task-button'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();
  
    cardsServiceSpy.deleteTask.and.returnValue(of(null));
    spyOn(component.refreshParent, 'emit');
  
    component.usunTask(1, 1);
  
    expect(cardsServiceSpy.deleteTask).toHaveBeenCalledWith(1, 1);
    expect(component.refreshParent.emit).toHaveBeenCalled();
  });

  it('should handle drag and drop', () => {
    const dragItem = fixture.debugElement.query(By.css('.task'));
    const dropContainer = fixture.debugElement.query(By.css('.task-container'));
  
    // Simulate a drag start event.
    dispatchMouseEvent(dragItem.nativeElement, 'mousedown');
    fixture.detectChanges();
  
    // Simulate the drag move event.
    dispatchMouseEvent(document, 'mousemove', dropContainer.nativeElement.getBoundingClientRect().x, dropContainer.nativeElement.getBoundingClientRect().y);
    fixture.detectChanges();
  
    // Simulate the drop event.
    dispatchMouseEvent(document, 'mouseup');
    fixture.detectChanges();
  
    // Add your assertions here.
    expect(dragItem.parent).toEqual(dropContainer, '');
  });
  
});

function dispatchMouseEvent(node: Node, type: string, x = 0, y = 0, button = 0) {
  const event = document.createEvent('MouseEvent');
  event.initMouseEvent(type, true, true, window, 0, 0, 0, x, y, false, false, false, false, button, null);
  node.dispatchEvent(event);
}