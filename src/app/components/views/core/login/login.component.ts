import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {AppAuthService} from '../../../../services/app.auth.service';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

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
  constructor(private authService: AppAuthService, private router: Router) {
  }

  login() {
    this.authService.login()
  }

  async reload() {
    await this.router.navigate(['dashboard'])
    window.location.reload();
  }
}
