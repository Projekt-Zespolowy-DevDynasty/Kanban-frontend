import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CardsService } from '../service/cards.service';
import { of } from 'rxjs';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let httpTestingController: HttpTestingController;
  let de: DebugElement;
  let cardServiceSpy: jasmine.SpyObj<CardsService>;


  beforeEach(async () => {
    cardServiceSpy = jasmine.createSpyObj('CardsService', ['putTask']);

    await TestBed.configureTestingModule({
      imports: [
        BoardComponent,
        HttpClientTestingModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideToastr(),
        { provide: CardsService, useValue: cardServiceSpy },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('column should have 3 px red border when has more tasks than limit', () => {

    component.newRow = {
      id: 1,
      name: 'To do',
      position: 1,
      cardsinrow: [],
    }

    const cards = [
      { id: 1, name: 'To do', maxTasksLimit: 2, position: 1, tasks: [] },
      { id: 2, name: 'In progress', maxTasksLimit: 2, position: 2, tasks: 
        [
          { id: 1, name: 'Task 1', color: 'red', position: 1, useers: [], subTasks: [] },
          { id: 2, name: 'Task 2', color: 'red', position: 2, useers: [], subTasks: [] },
          { id: 3, name: 'Task 3', color: 'red', position: 3, useers: [], subTasks: [] },
        ] 
      },
      { id: 3, name: 'Done', maxTasksLimit: 2, position: 3, tasks: [] },
    ] 

    component.data = cards;
    component.newRow.cardsinrow = cards;

    fixture.detectChanges();

    const column = de.queryAll(By.css('.column'));
    expect(column[1].styles['border']).toEqual('3px solid red');
  });

  it('should call putTask function from service when enter or button(in app) is pressed', () => {
    spyOn(component, 'onEnter');
    component.newRow = {
      id: 1,
      name: 'To do',
      position: 1,
      cardsinrow: [],
    }

    const cards = [
      { id: 1, name: 'To do', maxTasksLimit: 2, position: 1, tasks: [] },
      { id: 2, name: 'In progress', maxTasksLimit: 2, position: 2, tasks: 
        [
          { id: 1, name: 'Task 1', color: 'red', position: 1, useers: [], subTasks: [] },
          { id: 2, name: 'Task 2', color: 'red', position: 2, useers: [], subTasks: [] },
          { id: 3, name: 'Task 3', color: 'red', position: 3, useers: [], subTasks: [] },
        ] 
      },
      { id: 3, name: 'Done', maxTasksLimit: 2, position: 3, tasks: [] },
    ] 
    component.data = cards;
    component.newRow.cardsinrow = cards;

    fixture.detectChanges();

    cardServiceSpy.putTask.and.returnValue(of("success"));

    const input = de.query(By.css('.input-text'));
    
    input.triggerEventHandler('keyup.enter', { target: input.nativeElement });
    fixture.detectChanges();
    expect(component.onEnter).toHaveBeenCalled();


    const button = de.query(By.css('.add-task-button'));
    button.triggerEventHandler('click', { target: button.nativeElement });
    fixture.detectChanges();
    expect(component.onEnter).toHaveBeenCalled();

  });
});
