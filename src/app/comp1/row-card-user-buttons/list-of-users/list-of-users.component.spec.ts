import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfUsersComponent } from './list-of-users.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BoardComponent } from '../../../board/board.component';

xdescribe('ListOfUsersComponent', () => {
  let component: ListOfUsersComponent;
  let fixture: ComponentFixture<ListOfUsersComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOfUsersComponent, BoardComponent],
      // Add any necessary providers or imports here, e.g., services that the component depends on
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfUsersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user names correctly', () => {
    // Assuming component.allUsers is already populated
    const userNames = de.queryAll(By.css('.name-user-limit p'));
    expect(userNames[0].nativeElement.textContent).toContain(
      component.allUsers[0].firstName,
    );
    expect(userNames[1].nativeElement.textContent).toContain(
      component.allUsers[0].lastName,
    );
  });

  it('should call changeLimitUser when enter is pressed on the input', () => {
    spyOn(component, 'changeLimitUser');
    const input = de.query(By.css('.wip-limit-number'));
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    input.triggerEventHandler('keyup.enter', { target: input.nativeElement });
    fixture.detectChanges();

    expect(component.changeLimitUser).toHaveBeenCalled();
  });

  it('should call usunUsera when delete button is clicked', () => {
    spyOn(component, 'usunUsera');
    const btn = de.query(By.css('.btn-danger'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.usunUsera).toHaveBeenCalled();
  });

  // More tests can be added here to cover other interactions and checks
});
