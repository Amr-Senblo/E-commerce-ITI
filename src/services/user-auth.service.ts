import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { LocalStrogeService } from './local-stroge.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private isLogged: boolean;
  private loggSubject: BehaviorSubject<boolean>;
  constructor(
    private httpClient: HttpClient,
    private userLocalStorge: LocalStrogeService,
    private router: Router,
    private loc: Location
  ) {
    this.isLogged = false;
    this.loggSubject = new BehaviorSubject<boolean>(false);
  }
  getAllUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}/users`);
  }

  // logIn(email: string, password: string, remmberMe: boolean = false) {
  //   this.getAllUsers().subscribe((data) => {
  //     let users: IUser[] = data;
  //     let userExists = users.find(
  //       (user) => user.email === email && user.password === password
  //     );
  //     if (userExists) {
  //       console.log(userExists);
  //       if (!this.isLogged) {
  //         this.isLogged = true;
  //         this.loggSubject.next(true);
  //       }
  //       if (remmberMe)
  //         this.userLocalStorge.setItemAtLocalStorge(
  //           'accesToken',
  //           userExists.accessToken,
  //           2629800000
  //         );
  //       else
  //         this.userLocalStorge.setItemAtSessionStorge(
  //           'accesToken',
  //           userExists.accessToken
  //         );
  //       this.loc.back();
  //     } else {
  //       console.log('Not Found');
  //       this.loc.go(this.loc.path());
  //     }
  //   });
  // }
  logOut() {
    if (this.isLogged) {
      this.isLogged = false;
      this.loggSubject.next(false);
      this.userLocalStorge.removeItemFromLocalStorage('accesToken');
      this.userLocalStorge.removerItemFromSessionStorage('accesToken');
      this.router.navigateByUrl('Home');
    }
  }
  getLoggedStateSubject() {
    return this.loggSubject.asObservable();
  }
  get LoggedState() {
    return this.isLogged;
  }
  set setLoggedState(value: boolean) {
    this.isLogged = value;
    this.loggSubject.next(value);
  }
}