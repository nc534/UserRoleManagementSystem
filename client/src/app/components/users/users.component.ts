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

  changedUserList: User[];

  originalUser: User;

  changedUser: User;

  edits = {}

  addUserForm : FormGroup;

  add: boolean = false;

  editMode: boolean = false;

  hasEdit: boolean = false;

  deleteMode: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.userService.getAllUsers()
      .subscribe(res => {
        //show all users but the current admin
        this.userList = res.filter(user => parseInt(user.id) !== parseInt(localStorage.getItem('id')));

        this.changedUserList = JSON.parse(JSON.stringify(this.userList));
      })

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

  editUser(user) {
    if(!this.hasEdit) {
      this.hasEdit = true;
      this.originalUser = Object.assign({}, user);
      this.changedUser = user;
      user.editMode = true;
    }
  
  }

  saveUser(user) {
    
    for(var key in this.changedUser) {
      if(this.changedUser[key] !== this.originalUser[key] && key !== "editMode") {
        this.edits[key] = this.changedUser[key];
      }
    }

    this.originalUser = Object.assign({}, this.changedUser);
    
    user.editMode = false;
    this.hasEdit = false;

    this.userService.updateUser(parseInt(this.originalUser.id), this.edits)
      .subscribe(res => {
        console.log(res);
    });

  }

  cancel(user) {

    this.deleteMode = false;

    if(user !== undefined) {
      user.editMode = false;
      this.hasEdit = false;
      this.changedUserList = JSON.parse(JSON.stringify(this.userList));
    }
  }

  addUser() {

    //add new user to server
    this.userService.register(this.addUserForm.value).subscribe((res) => {

      if (res) {
        this.resetClicked();

        //get new user and push to frontend users list
        this.userService.getUserByEmail(this.addUserForm.value.email).subscribe((res) => {
          this.userList.push(res[0]);
          this.changedUserList.push(res[0]);
        });
        
        //reset form
        this.addUserForm.reset()

      }

    })
  }

  popup(user: User) {
    this.originalUser = user;
    this.deleteMode = true;
  }

  deleteUser(id: number) {

    this.deleteMode = false;

    //delete user from server
    this.userService.deleteUser(id).subscribe();
    
    //update user list in frontend
    this.changedUserList = this.changedUserList.filter(user => parseInt(user.id) !== id);
  }

}
