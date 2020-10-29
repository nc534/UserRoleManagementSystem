import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../../app.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent{

  constructor(
    public userService: UserService, 
    public appComponent: AppComponent,
    public router: Router) { }

  // ngOnInit(): void {
  // }
  
  home() {
    this.router.navigate(['home']);
  }

  profile() {
    this.router.navigate(['profile']);
  }

  logoutUser() {
    this.userService.logout()
  }

}
