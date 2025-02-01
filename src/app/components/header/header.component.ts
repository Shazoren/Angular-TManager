import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(public authService : AuthenticationService) {
  }
  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
