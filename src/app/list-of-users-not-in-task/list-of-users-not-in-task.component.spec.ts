import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfUsersNotInTaskComponent } from './list-of-users-not-in-task.component';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { UserService } from '../service/user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('ListOfUsersNotInTaskComponent', () => {
  let component: ListOfUsersNotInTaskComponent;
  let fixture: ComponentFixture<ListOfUsersNotInTaskComponent>;
  let de: DebugElement;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  // przypiszUsera - assignUserToTask , usunUsera - deleteUserFromTask
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['assignUserToTask', 'deleteUserFromTask']);

    await TestBed.configureTestingModule({
      imports: [ListOfUsersNotInTaskComponent],
      providers: [
        provideToastr(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: userServiceSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfUsersNotInTaskComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call assignUserToTask', () => {
    spyOn(component, 'przypiszUsera');
    const user = { firstName: 'John', lastName: 'Doe', color: '#fffff', email: "vp@vp.pl", id: 1, maxUserTasksLimit: 5, tasks: []};
    const user2 = { firstName: 'John', lastName: 'Doe', color: '#fffff', email: "vp@vp.pl", id: 1, maxUserTasksLimit: 5, tasks: []};
    component.usersInTask = [user2];
    component.usersNotInTask = [user];
    fixture.detectChanges();

    userServiceSpy.assignUserToTask.and.returnValue(of("success"));

    const btn = de.query(By.css('.add-user-to-task-button'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.przypiszUsera).toHaveBeenCalled();
  });

  it('should call deleteUserFromTask', () => {
    spyOn(component, 'usunUsera');
    const user = { firstName: 'John', lastName: 'Doe', color: '#fffff', email: "vp@vp.pl", id: 1, maxUserTasksLimit: 5, tasks: []};
    const user2 = { firstName: 'John', lastName: 'Doe', color: '#fffff', email: "vp@vp.pl", id: 1, maxUserTasksLimit: 5, tasks: []};
    component.usersInTask = [user2];
    component.usersNotInTask = [user];
    fixture.detectChanges();

    userServiceSpy.deleteUserFromTask;

    const btn = de.query(By.css('.delete-user-from-task-button'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.usunUsera).toHaveBeenCalled();
  });

  //list-user
  //first-and-last-name
  it('should display user names correctly', () => {
    const user = { firstName: 'John', lastName: 'Doe', color: '#fffff', email: "vp@vp.pl", id: 1, maxUserTasksLimit: 5, tasks: []};
    const user2 = { firstName: 'Walter', lastName: 'White', color: '#fffff', email: "vp@vp.pl", id: 1, maxUserTasksLimit: 5, tasks: []};
    component.usersInTask = [user2];
    component.usersNotInTask = [user];
    fixture.detectChanges();

    const listOfUsers = de.queryAll(By.css('.first-and-last-name'));
    const firstAndLastNames = listOfUsers[0].nativeElement.textContent;

    expect(firstAndLastNames).toBe(' ' + user.firstName + ' ' + user.lastName + ' ');
  });

});
