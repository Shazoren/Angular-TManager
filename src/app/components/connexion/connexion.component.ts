import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {

    constructor(public authService : AuthenticationService, private router : Router) {}

  connectByClient() {
    this.authService.profile = Profile.CLIENT
    this.router.navigateByUrl("/login");
  }
  
  connectByUser() {
    this.authService.profile = Profile.USER
    this.router.navigateByUrl("/login");
  }

  
}
