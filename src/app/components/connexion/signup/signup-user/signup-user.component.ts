import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../model/user.model';
import { AuthenticationService } from '../../../../services/authentication.service';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { Role } from '../../../../model/role';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrl: './signup-user.component.css'
})
export class SignupUserComponent implements OnInit {
  public signUpUserFormGroup! : FormGroup;
  private users: User[] = [];
  public errorMessage: string = '';

  constructor(private fb : FormBuilder,
              private authService : AuthenticationService,
              private userService: UserService,
              private router : Router) {
  }
  
  ngOnInit() {
    // on s'assure que l'user est bien passé par la page principale de connexion
    if(this.authService.profile){
      this.signUpUserFormGroup = this.fb.group({
        lastname : this.fb.control('', [Validators.required]),
        firstname : this.fb.control('', [Validators.required]),
        email : this.fb.control(''),
        login : this.fb.control('', [Validators.required]),
        password : this.fb.control('', [Validators.required])
      });
      this.userService.fillDefaultValues();
      this.userService.users$.subscribe(users => this.users = users)
    }
    else{
      this.router.navigateByUrl("/");
    }
  }

  userSignUp() {
    if (this.signUpUserFormGroup.valid) {
      const loginForm = this.signUpUserFormGroup.value.login
      const passwordForm = this.signUpUserFormGroup.value.password
      const existingUser = this.users.find((user) => user.login === loginForm && user.password === passwordForm);
      const newId = this.users.length > 0 ? (parseInt(this.users[this.users.length-1].id) + 1).toString() : "1";
      const auth = this.authService.signin(existingUser, newId)
      if(auth) {
        const newUser = {id: newId, role: Role.USER, ...this.signUpUserFormGroup.value};
        this.userService.addUser(newUser).subscribe({
          complete: () => { this.router.navigateByUrl("/main/home") },
          error: (err) => { alert(err.message); },
        })
      }
      else{
        this.errorMessage = "Utilisateur déjà existant."
      }
    }
  }
}
