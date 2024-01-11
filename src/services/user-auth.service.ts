import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(private httpClient: HttpClient) {}
  getAllUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}/users`);
  }
  logIn(email: string, password: string,remmberMe:boolean=false) {
    this.getAllUsers().subscribe((data) => {
      let users: IUser[] = data;
      let userExists = users.some(
        (user) => user.email === email && user.password === password
      );
      if (!userExists) {
        console.log('user not exsits');
      } else console.log('user exists');
    });
  }

}
