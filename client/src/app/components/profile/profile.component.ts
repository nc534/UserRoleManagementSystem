import { Component, OnInit } from '@angular/core';

import { NavigationComponent } from '../navigation/navigation.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(parseInt(localStorage.getItem('id')))
      .subscribe(res => {
        this.user = res[0];
        console.log(this.user)
      })
  }

}
