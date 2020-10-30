import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { NavigationComponent } from '../navigation/navigation.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  editUserForm: FormGroup;

  userList: object;

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
    // this.userService.register(this.addUserForm.value).subscribe((res) => {

    //   if (res) {
    //     this.addUserForm.reset()
    //   }
    // })

    console.log(this.addUserForm.value);
    this.addUserForm.reset();
    this.resetClicked();
  }

}
