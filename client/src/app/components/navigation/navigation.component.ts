import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../../app.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit{

  constructor(
    private userService: UserService, 
    public appComponent: AppComponent,
    private router: Router) { }

  admin: boolean 

  ngOnInit(): void {
    this.admin = this.userService.isAdmin();
  }

  home() {
    this.router.navigate(['home']);
  }

  profile() {
    this.router.navigate(['profile']);
  }

  users() {
    this.router.navigate(['users']);
  }

  logoutUser() {
    localStorage.clear()
    this.userService.logout()
  }

}
