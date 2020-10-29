import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // currentUser: User = {
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   password: '',
  //   role: 'user'
  // };

  constructor(private http: HttpClient, public router: Router) { }

  private baseUrl = 'http://localhost:3000/users';
  currentUser = {};

  login(user: User) {
    return this.http.post<User>(`${this.baseUrl}/login`, user)
        .subscribe((res: User) => {
          sessionStorage.setItem('access_token', res[0].email)
          this.getUser(res[0].id).subscribe((res) => {
            this.currentUser = res;
            this.router.navigate(['/home']);
          })
        })
  }

  register(user: User) {
    return this.http.post(`${this.baseUrl}`, user)
  }

  getAllUsers() {
    return this.http.get(this.baseUrl);
  }

  getUser(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // updateUser(user: User) {
  //   return this.http.patch()
  // }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAccessToken() {
    return sessionStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = sessionStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (sessionStorage.removeItem('access_token') == null) {
      this.router.navigate(['/login']);
    }
  }

}