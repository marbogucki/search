import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {UsersService} from './services/users.service';
import {User} from './types/user.type';
import {debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {removeItem} from '@app/shared/utils/remove-item';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  private unsubscribeSubject = new Subject<void>();
  private usersQuerySubject = new BehaviorSubject<string>('');
  users: User[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.usersQuerySubject.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      switchMap((query: string) => this.usersService.getUsers(query)),
      takeUntil(this.unsubscribeSubject)
    ).subscribe((users) => this.users = users);
  }

  removeUser(user: User) {
    this.usersService.removeUser(user.id).subscribe(
      () => this.users = removeItem<User>(this.users, user)
    );
  }

  searchUsers(query: string) {
    this.usersQuerySubject.next(query);
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }
}
