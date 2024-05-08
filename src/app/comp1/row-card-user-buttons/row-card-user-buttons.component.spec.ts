import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowCardUserButtonsComponent } from './row-card-user-buttons.component';
import { BoardComponent } from '../../board/board.component';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RowService } from '../../service/row.service';
import { UserService } from '../../service/user.service';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

describe('RowCardUserButtonsComponent', () => {
  let component: RowCardUserButtonsComponent;
  let fixture: ComponentFixture<RowCardUserButtonsComponent>;
  let de: DebugElement;
  let rowServiceSpy: jasmine.SpyObj<RowService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    rowServiceSpy = jasmine.createSpyObj('RowService', ['addRow', 'addColumnInRow']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['addUser']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['danger', 'success', 'error']);

    await TestBed.configureTestingModule({
      imports: [RowCardUserButtonsComponent],
      providers: [
        FormBuilder,
        provideToastr(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RowService, useValue: rowServiceSpy},
        { provide: UserService, useValue: userServiceSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RowCardUserButtonsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    rowServiceSpy = TestBed.inject(RowService) as jasmine.SpyObj<RowService>
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    fixture.detectChanges();
  });
  // dodajwiersz - addRow, dodaj usera - addUser, dodaj karte - addcolumninrow
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addRow  when enter on the input or button is pressed', () => {
    spyOn(component, 'dodajWiersz');
    
    const row = {id: 1, name: "Row", position: 1, cardsinrow: []}
    rowServiceSpy.addRow.and.returnValue(of(row));

    // enter on input
    const input = de.query(By.css('.add-row-input'));
    input.triggerEventHandler('keyup.enter', {target: input.nativeElement});
    fixture.detectChanges();
    expect(component.dodajWiersz).toHaveBeenCalled();

    // when button is clicked
    const btn = de.query(By.css('.add-row-button'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.dodajWiersz).toHaveBeenCalled();
  });

  it('should call addUser on submitting form', () => {
    spyOn(component, 'dodajUsera');

    const user = {id: 1, firstName: "A", lastName: "B", email: "a", maxUserTasksLimit: 2, color: "red", tasks: []};
    userServiceSpy.addUser.and.returnValue(of(user));

    const form = de.query(By.css('.add-user-form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(component.dodajUsera).toHaveBeenCalled();

  });
  
  it('should show error toastr on wrong email in form', () => {
    const toastrSpy = spyOn(component.toastr, 'warning');

    component.addUserForm.setValue({firstName: 'John', lastName: 'Doe', email: 'invalidEmail'});
    component.dodajUsera();
  
    expect(toastrSpy).toHaveBeenCalledWith('Niepoprawny email');
  });


  it('should call addColumnInRow', () => {
    spyOn(component, 'dodajKarte');
    const row = {id: 1, name: "Row", position: 1, cardsinrow: []}
    rowServiceSpy.addColumnInRow.and.returnValue(of(row));

    const input = de.query(By.css('.add-card-input'));
    
    input.triggerEventHandler('keyup.enter', {target: input.nativeElement});
    fixture.detectChanges();
    expect(component.dodajKarte).toHaveBeenCalled();

    const btn = de.query(By.css('.add-card-button'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.dodajKarte).toHaveBeenCalled();
  });
});
