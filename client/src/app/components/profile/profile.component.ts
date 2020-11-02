import { Component, OnInit } from '@angular/core';

import { NavigationComponent } from '../navigation/navigation.component';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  originalUser: User;

  changedUser: User;

  edits = {}

  editMode: boolean = false;

  deleteMode: boolean = false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUser(parseInt(localStorage.getItem('id')))
      .subscribe(res => {
        this.originalUser = res[0];
        
        this.changedUser = Object.assign({}, this.originalUser);

      })
  }

  edit() {
    this.editMode = true;
  }

  save() {
    for(var key in this.changedUser) {
      if(this.changedUser[key] !== this.originalUser[key]) {
        this.edits[key] = this.changedUser[key];
      }
    }

    this.originalUser = Object.assign({}, this.changedUser);
    
    this.editMode = false;

    this.userService.updateUser(parseInt(localStorage.getItem('id')), this.edits)
      .subscribe(res => {
        console.log(res);
      });
    
  }

  cancel() {

    this.changedUser = Object.assign({}, this.originalUser);

    this.editMode = false;
    this.deleteMode = false;
  }

  popup() {
    this.deleteMode = true;
  }

  delete() {
    this.userService.deleteUser(parseInt(localStorage.getItem('id'))).subscribe();
    localStorage.clear()
    this.userService.logout()
  }

}
