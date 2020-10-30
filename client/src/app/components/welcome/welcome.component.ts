import { Component, OnInit } from '@angular/core';

import { NavigationComponent } from '../navigation/navigation.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  currentUser = {};

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(parseInt(localStorage.getItem('id')))
      .subscribe(res => {
        this.currentUser = res;
      })

  }

}
