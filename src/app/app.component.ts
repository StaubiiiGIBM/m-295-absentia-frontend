import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/views/core/header/header.component';
import {NavigationComponent} from './components/views/core/navigation/navigation.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {AppIsInRolesDirective} from './directives/app-is-in-roles.dir';
import {AppRoles} from '../app.roles';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavigationComponent, MatIcon, MatIconButton, NgIf, AppIsInRolesDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'm-295-absentia-frontend';
  show = true

  onClick() {
    this.show = !this.show
    console.log("Toggled")
  }

  protected readonly AppRoles = AppRoles;
}
