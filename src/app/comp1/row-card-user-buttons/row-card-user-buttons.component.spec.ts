import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowCardUserButtonsComponent } from './row-card-user-buttons.component';
import { BoardComponent } from '../../board/board.component';

xdescribe('RowCardUserButtonsComponent', () => {
  let component: RowCardUserButtonsComponent;
  let fixture: ComponentFixture<RowCardUserButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [RowCardUserButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RowCardUserButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
