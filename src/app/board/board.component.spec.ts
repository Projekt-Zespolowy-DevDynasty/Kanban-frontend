import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { CardsService } from '../service/cards.service';
import { RowService } from '../service/row.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CdkDropList, CdkDrag, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NgStyle } from '@angular/common';
import { TaskComponent } from '../task/task.component';

xdescribe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      providers: [CardsService, RowService],
      imports: [
        MatSlideToggleModule,
        CdkDropList,
        CdkDrag,
        CdkDropListGroup,
        NgStyle,
        TaskComponent,
        BoardComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
