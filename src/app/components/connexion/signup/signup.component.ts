import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Profile } from '../../../model/profile';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  public profile: string = '';

  constructor(private authService : AuthenticationService) {}

  ngOnInit() {
    if(this.authService.profile){
      this.profile = this.authService.profile;
    }
  }
}
