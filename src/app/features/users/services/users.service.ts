import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '@core/services/http.service';
import {User} from '@app/features/users/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly url = 'users';

  constructor(private httpService: HttpService) { }

  getUsers(query?: string): Observable<User[]> {
    return this.httpService.getData(this.url, query);
  }

  removeUser(id: number): Observable<User> {
    return this.httpService.removeData(this.url, id);
  }
}
