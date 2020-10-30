import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUser() {
    this.userService.login(this.loginForm.value)
  }

}
