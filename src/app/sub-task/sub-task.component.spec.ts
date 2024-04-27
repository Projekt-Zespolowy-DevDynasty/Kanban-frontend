import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskComponent } from './sub-task.component';
import { BoardComponent } from '../board/board.component';

xdescribe('SubTaskComponent', () => {
  let component: SubTaskComponent;
  let fixture: ComponentFixture<SubTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [SubTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
