import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-list-of-users',
  standalone: true,
  imports: [],
  templateUrl: './list-of-users.component.html',
  styleUrl: './list-of-users.component.scss',
})
export class ListOfUsersComponent {
  @Input() allUsers!: User[];
  @Output() refreshParent: EventEmitter<any> = new EventEmitter();

  constructor() {}
  userService = inject(UserService);
  toastr = inject(ToastrService);

  reloadParentUsers() {
    this.refreshParent.emit();
  }

  usunUsera(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.toastr.success('Usunięto Użytkownika');
        this.reloadParentUsers();
      },
      error: (error) => {
        this.toastr.error('Nie udało się usunąć Użytkownika');
      },
    });
  }

  changeLimitUser(userId: number, limit: string) {
    let limit3 = parseInt(limit);

    this.userService.setLimitUser(userId, limit3).subscribe({
      next: () => {
        this.toastr.success('Zmieniono limit Usera');
        this.reloadParentUsers();
      },
      error: (error) => {
        if (limit3 < 0) {
          this.toastr.error('Limit nie może być mniejszy niż 0');

          return;
        }
        if (error.status == 415) {
          this.toastr.error('User aktualnie ma więcej zadań niż nowy limit');
          return;
        }
        this.toastr.error('Nie udało się zmienić limitu Usera');
      },
    });
  }
}
