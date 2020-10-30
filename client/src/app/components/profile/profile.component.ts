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
      first_name: "John",
      last_name: "Smith",
      email: "js@email.com",
      password: "P@ssW0rd"
  }

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
