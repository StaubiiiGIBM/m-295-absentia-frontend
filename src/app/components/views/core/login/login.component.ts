import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {AppAuthService} from '../../../../services/app.auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AppAuthService) {
  }

  async login() {
    this.authService.login()
  }

  async reload() {
    window.location.reload();
  }
}
