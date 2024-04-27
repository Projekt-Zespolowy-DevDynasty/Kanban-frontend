import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RowService } from '../../service/row.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { Row } from '../../models/row.model';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';

@Component({
  selector: 'app-row-card-user-buttons',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ListOfUsersComponent
  ],
  templateUrl: './row-card-user-buttons.component.html',
  styleUrl: './row-card-user-buttons.component.scss'
})
export class RowCardUserButtonsComponent {

  @Input() allUsers!: User[];
  @Output() refreshParent: EventEmitter<any> = new EventEmitter();


  toastr = inject(ToastrService);
  rowService = inject(RowService);
  userService = inject(UserService);
  

  reloadParent() {
    this.refreshParent.emit();
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
        this.reloadParent();
      },
      error: (error) => {
        this.toastr.error('Nie udało się dodać karty');
      },
    });
  }

  addUserForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  
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
        this.reloadParent();
      },
      error: (error) => {
        this.toastr.error('Nie udało się dodać Użytkownika');
      },
    });
  }
  dodajWiersz(rowName: string) {
    this.rowService.addRow(rowName).subscribe({
      next: (addRow: Row) => {
        this.toastr.success('Dodano wiersz');
        this.reloadParent();
      },
      error: (error) => {
        this.toastr.error('Nie udało się dodać wiersza');
      },
    });
  }


}
