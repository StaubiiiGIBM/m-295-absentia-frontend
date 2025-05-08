import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {AppAuthService} from '../../../../services/app.auth.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {AppIsInRolesDirective} from '../../../../directives/app-is-in-roles.dir';
import {AppRoles} from '../../../../../app.roles';

@Component({
  selector: 'app-header',
  imports: [
    MatButton,
    AppIsInRolesDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public constructor(private authService: AppAuthService, public oauthService: OAuthService) {
  }

  logout() {
    this.authService.logout();
  }

  protected readonly AppRoles = AppRoles;
}
