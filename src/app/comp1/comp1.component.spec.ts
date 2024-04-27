import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comp1Component } from './comp1.component';
import { BoardComponent } from '../board/board.component';

xdescribe('Comp1Component', () => {
  let component: Comp1Component;
  let fixture: ComponentFixture<Comp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [Comp1Component, BoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Comp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
