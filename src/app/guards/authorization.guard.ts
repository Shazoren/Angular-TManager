import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateFn,
    GuardResult,
    MaybeAsync,
    RouterStateSnapshot
  } from '@angular/router';
  import {Injectable} from "@angular/core";
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../model/role';
   @Injectable()
  export  class  AuthorizationGuard  {
     constructor(private authService : AuthenticationService) {
     }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
       let authorize = false;
       if(this.authService.role == Role.ADMIN) authorize = true;
       return authorize;
    }
  }
  
  