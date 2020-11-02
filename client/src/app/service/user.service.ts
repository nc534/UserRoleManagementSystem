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

  constructor(private http: HttpClient, private router: Router) { }

  private baseUrl = 'http://localhost:3000/users';
  currentUser = {};  
  id: number;
  role: string;

  login(user: User) {
    return this.http.post<User>(`${this.baseUrl}/login`, user)
        .subscribe((res: User) => {
          sessionStorage.setItem('access_token', res[0].email)
          this.getUser(res[0].id).subscribe((res) => {
            this.currentUser = res;
            this.id = this.currentUser[0].id;
            this.role = this.currentUser[0].role;
            localStorage.setItem('id', this.id.toString());
            localStorage.setItem('role', this.role);
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

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, changes: object) {
    return this.http.patch(`${this.baseUrl}/${id}`, changes)
  }


  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAccessToken() {
    return sessionStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    let authToken = sessionStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  isAdmin(): boolean {
    return (localStorage.getItem('role') === 'admin') ? true : false;
  }

  logout() {
    if (sessionStorage.removeItem('access_token') == null) {
      this.router.navigate(['/login']);
    }
  }

}
