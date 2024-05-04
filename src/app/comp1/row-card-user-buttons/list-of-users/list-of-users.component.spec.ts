import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { of } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { ListOfUsersComponent } from './list-of-users.component';

describe('ListOfUsersComponent', () => {
  let component: ListOfUsersComponent;
  let fixture: ComponentFixture<ListOfUsersComponent>;
  let de: DebugElement;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['deleteUser', 'setLimitUser']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [ListOfUsersComponent, ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideToastr(),
        { provide: UserService, useValue: userServiceSpy},
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
      // Add any necessary providers or imports here, e.g., services that the component depends on
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfUsersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user names correctly', () => {
    // Assuming component.allUsers is already populated
    component.allUsers = [ 
      { firstName: 'John', lastName: 'Doe', color: '#fffff', email: "vp@vp.pl", id: 1, maxUserTasksLimit: 5, tasks: []}, 
      { firstName: 'Jane', lastName: 'Januh', color: '#fffff', email: "ww@vv.pl", id: 2, maxUserTasksLimit: 5, tasks: []},
    ];
    fixture.detectChanges();

    const userFirstNames = de.queryAll(By.css('.name-user-limit .first-name'));
    const userLastNames = de.queryAll(By.css('.name-user-limit .last-name'));

    expect(userFirstNames[0].nativeElement.textContent).toContain(
      component.allUsers[0].firstName,
    );
    expect(userLastNames[1].nativeElement.textContent).toContain(
      component.allUsers[1].lastName,
    );
  });

  it('should call changeLimitUser when enter is pressed on the input', () => {
    spyOn(component, 'changeLimitUser');

    component.allUsers = [ 
      { firstName: 'John', lastName: 'Doe', color: '#fffff', email: "vp@vp.pl", id: 1, maxUserTasksLimit: 5, tasks: []}, 
      { firstName: 'Jane', lastName: 'Doe', color: '#fffff', email: "ww@vv.pl", id: 2, maxUserTasksLimit: 5, tasks: []},
    ];
    
    fixture.detectChanges();
    userServiceSpy.setLimitUser.and.returnValue(of("success"));

    const input = de.query(By.css('.wip-limit-number'));
    
    input.triggerEventHandler('keyup.enter', { target: input.nativeElement });
    fixture.detectChanges();
    expect(component.changeLimitUser).toHaveBeenCalled();
  

  });

  it('should call setLimitUser and show success message', () => {
    const userId = 1;
    const limit = "5";
    userServiceSpy.setLimitUser.and.returnValue(of("Aha"));
    
    component.changeLimitUser(userId, limit);

    expect(userServiceSpy.setLimitUser).toHaveBeenCalledWith(userId, parseInt(limit));

    expect(toastrServiceSpy.success).toHaveBeenCalled();
    expect(toastrServiceSpy.error).not.toHaveBeenCalled();
  });

  it('should call usunUsera when delete button is clicked', () => {
    spyOn(component, 'usunUsera');
    component.allUsers = [ 
      { firstName: 'John', lastName: 'Doe', color: '#fffff', email: "vp@vp.pl", id: 1, maxUserTasksLimit: 5, tasks: []}, 
      { firstName: 'Jane', lastName: 'Doe', color: '#fffff', email: "ww@vv.pl", id: 2, maxUserTasksLimit: 5, tasks: []},
    ];
    fixture.detectChanges();

    const btn = de.query(By.css('.btn-danger'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.usunUsera).toHaveBeenCalled();
  });

  // More tests can be added here to cover other interactions and checks
});


/** 
 *  testy 
 *  - sprawdzenie czy komponent został utworzony
 *  - czy cos jest wyswietlane poprawnie
 *  - czy akcja przycisku albo inputa wywoluje funkcje
 *  - czy funkcja wywoluje odpowiednie metody z serwisu
 * 
 */

/*
  testy na serwisach
  - czy request jest wysłany z odpowiednimi parametrami i body
  - czy kod odpowiedzi jest prawidłowy
  - czy odpowiedź z kod błędu jest odpowiednia
*/