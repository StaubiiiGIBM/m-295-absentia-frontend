import {Component, OnInit} from '@angular/core';
import {AppAuthService} from '../../../../services/app.auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  useralias = ''
  public constructor(private authService: AppAuthService) {
  }
  ngOnInit(): void {
    this.authService.useraliasObservable.subscribe(alias => {
      this.useralias = alias;
    });
  }
}
