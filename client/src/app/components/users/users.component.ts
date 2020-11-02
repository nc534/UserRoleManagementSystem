import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { NavigationComponent } from '../navigation/navigation.component';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  editUserForm: FormGroup;

  userList: User[];

  addUserForm : FormGroup;
  add: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.userService.getAllUsers()
      .subscribe(res => {
        this.userList = res;
      })

    this.editUserForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      role: ['']
    });

    this.addUserForm= this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      role: ['user']
    });
  }

  addClicked() {
    this.add = true;
  }

  resetClicked() {
    this.add = false;
  }

  addUser() {

    //add new user to server
    this.userService.register(this.addUserForm.value).subscribe((res) => {

      if (res) {
        this.resetClicked();

        //get new user and push to frontend users list
        this.userService.getUserByEmail(this.addUserForm.value.email).subscribe((res) => {
          this.userList.push(res[0]);
        });
        
        //reset form
        this.addUserForm.reset()

      }

    })
  }

  deleteUser(id: number) {

    //delete user from server
    this.userService.deleteUser(id).subscribe();
    
    //update user list in frontend
    this.userList = this.userList.filter(user => parseInt(user.id) !== id);
  }

}
