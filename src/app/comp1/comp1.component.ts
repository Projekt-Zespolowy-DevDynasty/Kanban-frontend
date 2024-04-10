import { Component, inject } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsService } from '../service/cards.service';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
} from '@angular/common/http';
import { NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { BoardComponent } from '../board/board.component';
import { Row } from '../models/row.model';
import { RowService } from '../service/row.service';
import { TaskComponent } from '../task/task.component';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comp1',
  standalone: true,
  providers: [CardsService, RowService, UserService],
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.scss',
  imports: [
    MatSlideToggleModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    NgStyle,
    BoardComponent,
    TaskComponent,
    ReactiveFormsModule,
  ],
})
export class Comp1Component {
  allRows!: Row[];
  dlugoscListyRows!: number;
  data!: Card[];
  allUsers!: User[];

  addUserForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  ngOnInit(): void {
    this.fetchCards();
    this.fetchUsers();
  }
  ngAfterViewInit() {
    this.fetchCards();
  }



  constructor(
    private cardService: CardsService,
    private rowService: RowService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}



  usunKarte(positionNumber: number, name: string) {
    if (confirm('Usunąć kolumne ' + name + '?')) {
      this.rowService.deleteColumnInRow(positionNumber).subscribe({
        next: (positionNumber: Row) => {
          this.toastr.success('Usunięto kolumne');
          this.fetchCards();
        },
        error: (error) => {
          this.toastr.error('Nie udało się usunąć kolumny');
        },
      });
    }
  }

  przesunKarte(sourceColumnPosition: number, targetColumnPosition: number) {
    this.rowService
      .moveColumn(sourceColumnPosition, targetColumnPosition)
      .subscribe(() => {
        this.fetchCards();
      });
  }

  changeLimit(cardId: number, limit: string, maxTasksLimit: number) {
    let limit2 = parseInt(limit);

    this.cardService.changeLimit(cardId, limit2).subscribe(() => {
      this.fetchCards();
    });
  }



  cardName = '';
  dodajKarte(cardName: string) {
    if (cardName.trim() == '') {
      this.toastr.warning('Nie można dodać karty bez nazwy');
      return;
    }

    this.rowService.addColumnInRow(cardName).subscribe({
      next: (myRow: Row) => {
        this.toastr.success('Dodano karte');
        this.fetchCards();
      },
      error: (error) => {
        this.toastr.error('Nie udało się dodać karty');
      },
    });
  }
  zmainaNazwyKarty(cardId: number, newName: string) {
    this.cardService.zmainaNazwyKarty(cardId, newName).subscribe({
      next: (newName: string) => {
        this.toastr.success('Zmieniono nazwę');
        this.fetchCards();
      },
      error: (error) => {
        this.toastr.error('Nie udało się zmienić nazwy');
      },
    });
  }


  
  //private cardService = inject(CardsService);

  value = '';

  onEnter(value: string, card_id: number) {
    this.cardService.putTask(value, card_id).subscribe(() => {
      this.fetchCards();
    });
    this.value = value;
  }



  fetchCards() {
    this.rowService.getAll().subscribe({
      next: (rows: Row[]) => {
        this.allRows = rows;
        this.data = rows[0].cardsinrow;
        this.dlugoscListyRows = rows.length;
      },
      error: (error) => {},
    });
  }
  dodajWiersz(rowName: string) {
    this.rowService.addRow(rowName).subscribe({
      next: (addRow: Row) => {
        this.toastr.success('Dodano wiersz');
        this.fetchCards();
      },
      error: (error) => {
        this.toastr.error('Nie udało się dodać wiersza');
      },
    });
  }

  przeniesGora(rowId: number) {
    this.rowService.moveUpRow(rowId).subscribe(() => {
      this.fetchCards();
    });
  }
  renameRow(rowId: number, newName: string) {
    this.rowService.renameRow(rowId, newName).subscribe(() => {
      this.fetchCards();
    });
  }
  usunWiersz(rowId: number) {
    if (confirm('Usunąć wiersz ' + '?')) {
      this.rowService.deleteRow(rowId).subscribe({
        next: (rowId: Row) => {
          this.toastr.success('Usunięto wiersz');
          this.fetchCards();
        },
        error: (error) => {
          this.toastr.error('Nie udało się usunąć wiersza');
        },
      });
    }
  }

  przeniesDol(rowId: number) {
    this.rowService.moveDownRow(rowId).subscribe(() => {
      this.fetchCards();
    });
  }


  fetchUsers() {
    this.userService.getAllUser().subscribe({
      next: (users: User[]) => {
        this.allUsers = users;
      },
      error: (error) => {},
    });
}
  dodajUsera() {
    const user: User = this.addUserForm.value as User;
    if(user.firstName.trim() == '' || user.lastName.trim() == '' || user.email.trim() == '') {
      this.toastr.warning('Nie można dodać użytkownika bez imienia, nazwiska lub emaila');
      return;
    }
    // validate email
    const email = user.email;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(email)) {
      this.toastr.warning('Niepoprawny email');
      return;
    }
    
    this.userService.addUser(user).subscribe({
      next: (users: User) => {
        this.toastr.success('Dodano Użytkownika');
        this.addUserForm.reset();
        this.fetchUsers();
      },
      error: (error) => {
        this.toastr.error('Nie udało się dodać Użytkownika');
      },
    });
  }

usunUsera(userId: number) {
  
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.toastr.success('Usunięto Użytkownika');
        this.fetchUsers();
      },
      error: (error) => {
        this.toastr.error('Nie udało się usunąć Użytkownika');
      },
    });
  
}
dodajUseraDoTaska(userId: number, taskId: number) {
  this.userService.addUserToTask(userId, taskId).subscribe({
    next: (users: User) => {
      this.toastr.success('Dodano Użytkownika do Taska');
      this.fetchUsers();
    },
    error: (error) => {
      this.toastr.error('Nie udało się dodać Użytkownika do Taska');
    },
  });
}
usunUseraZTaska(userId: number, taskId: number) {
  this.userService.deleteUserFromTask(userId, taskId).subscribe({
    next: () => {
      this.toastr.success('Usunięto Uzytkownika z Taska');
      this.fetchUsers();
    },
    error: (error) => {
      this.toastr.error('Nie udało się usunąć Użytkownika z Taska');
    },
  });
}
changeLimitUser(userId: number, limit: string, maxUserLimit: number) {
  let limit3 = parseInt(limit);

  this.userService.setLimitUser(userId, limit3).subscribe(() => {
    this.fetchUsers();
  });
}


}
