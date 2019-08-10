import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UsersService} from './services/users.service';
import {User} from './types/user.type';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private usersQuerySubject = new BehaviorSubject<string>('');
  users: Observable<User[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.usersQuerySubject.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      switchMap((query: string) => this.usersService.getUsers(query))
    );
  }

  removeUser(user: User) {
    this.usersService.removeUser(user.id).subscribe();
  }
}
