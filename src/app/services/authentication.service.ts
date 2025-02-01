import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Role } from '../model/role';
import { Profile } from '../model/profile';
import { Client } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public id : string | undefined;
  public role : string | undefined;
  public profile : string | undefined;
  public authenticated : boolean = false;
  constructor(private router : Router) { }

  public login(existingPerson: User | Client | undefined){
    if(existingPerson != undefined){
      this.id = existingPerson.id;
      this.authenticated = true;
      existingPerson as User ? this.role = (existingPerson as User).role : Role.USER;
      return true;
    } else {
      return false;
    }
  }

  public signin(existingPerson: User | Client | undefined, newId: string){
    if(existingPerson != undefined){
      return false;
    }
    else{
      this.id = newId;
      this.role = Role.USER;
      this.authenticated = true;
      return true;
    }
  }

  logout() {
    this.authenticated = false;
    this.id = undefined;
    this.role = undefined;
    this.router.navigateByUrl("/");
  }

  isAdmin(): boolean {
    return this.role == Role.ADMIN
  }

  isUser(): boolean {
    return this.profile == Profile.USER
  }

  isClient(): boolean {
    return this.profile == Profile.CLIENT
  }
}
