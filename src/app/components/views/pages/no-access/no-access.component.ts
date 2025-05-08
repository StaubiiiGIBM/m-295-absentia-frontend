import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { AppAuthService } from '../../../../services/app.auth.service';
import {LoginComponent} from '../../core/login/login.component';

@Component({
    selector: 'app-no-access',
    templateUrl: './no-access.component.html',
    styleUrls: ['./no-access.component.scss'],
  imports: [MatCard, MatCardContent, MatIcon, LoginComponent],
})
export class NoAccessComponent {

  constructor (
    public authService : AppAuthService
  ) {}

}
