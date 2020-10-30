import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
  ) { 
    this.loginForm= this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  loginUser() {
    this.userService.login(this.loginForm.value)
  }

}
