import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfUsersNotInTaskComponent } from './list-of-users-not-in-task.component';


xdescribe('ListOfUsersNotInTaskComponent', () => {
  let component: ListOfUsersNotInTaskComponent;
  let fixture: ComponentFixture<ListOfUsersNotInTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfUsersNotInTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfUsersNotInTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
