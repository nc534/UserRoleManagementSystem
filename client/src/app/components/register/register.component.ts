import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../app.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  registerUser() {
    
    this.userService.register(this.registerForm.value).subscribe((res) => {

      console.log(res);
      if (res) {
        this.registerForm.reset()
        this.router.navigate(['login']);
      }
    })

  }

  ngOnInit(): void {
    this.registerForm= this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      role: ['user']
    });
  }

}
