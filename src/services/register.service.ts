import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  _url = 'http://localhost:3000/users';
  constructor(private _http: HttpClient) {}

  register(user: IUser) {
    return this._http.post<any>(this._url, user);
  }
}
