import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '@app/features/users/types/user.type';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  @Output() userToRemoved: EventEmitter<User> = new EventEmitter<User>();
  @Input() users: User[];

  removeUser(user) {
    this.userToRemoved.emit(user);
  }
}
