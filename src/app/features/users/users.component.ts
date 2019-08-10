import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UsersService} from './services/users.service';
import {User} from './types/user.type';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

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
    this.usersService.removeUser(user.id)
      .subscribe(data => console.log(data));
  }

  searchUsers(query: string) {
    this.usersQuerySubject.next(query);
  }
}
