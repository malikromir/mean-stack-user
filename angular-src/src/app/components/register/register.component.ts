import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name!: String;
  username!: String;
  email!: String;
  password!: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    };
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill all fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter valid email', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    this.authService.registerUser(user).subscribe((data: any) => {
      if (data.success) {
        this.flashMessage.show('User registered!', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/register']);
      }
    });
    return;
  }
}
