import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../model/user.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { Profile } from '../../../model/profile';
import { Client } from '../../../model/client.model';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginFormGroup! : FormGroup;
  public profile: string = '';
  private users: User[] = [];
  private clients: Client[] = [];
  public errorMessage: string = '';

  constructor(private fb : FormBuilder,
              private authService : AuthenticationService,
              private userService: UserService,
              private clientService: ClientService,
              private router : Router) {
  }
  
  ngOnInit() {
    // on s'assure que l'user est bien passé par la page principale de connexion
    if(this.authService.profile){
      this.profile = this.authService.profile

      // on configure le form utilisateur quand l'user veut se co en tant que utilisateur
      if(this.profile == Profile.USER){
        this.loginFormGroup = this.fb.group({
          login : this.fb.control('', [Validators.required]),
          password : this.fb.control('', [Validators.required])
        });
        this.userService.fillDefaultValues();
        this.userService.users$.subscribe(users => this.users = users)
      }
      // on configure le form client quand l'user veut se co en tant que client
      if(this.profile == Profile.CLIENT){
        this.loginFormGroup = this.fb.group({
          lastname : this.fb.control('', [Validators.required]),
          firstname : this.fb.control('', [Validators.required]),
          email : this.fb.control('', [Validators.required])
        });
        this.clientService.fillDefaultValues();
        this.clientService.client$.subscribe(clients => this.clients = clients)
      }
    }
    else{
      this.router.navigateByUrl("/");
    }
  }

  login(){
    if(this.profile == Profile.USER){
      this.loginByUser()
    }
    if(this.profile == Profile.CLIENT){
      this.loginByClient()
    }
  }

  loginByUser(){
    const login = this.loginFormGroup.value.login;
    const password = this.loginFormGroup.value.password;
    const user: User | undefined = this.users.find(user => user.login === login && user.password === password)
    const auth = this.authService.login(user)
    if(auth == true){
      this.router.navigateByUrl("/main/home");
    }
    else{
      this.errorMessage = "Identifiant ou mot de passe incorrect."
    }
  }

  loginByClient(){
    const lastname = this.loginFormGroup.value.lastname;
    const firstname = this.loginFormGroup.value.firstname;
    const email = this.loginFormGroup.value.email;
    const client: Client | undefined = this.clients.find(client => client.lastname === lastname && client.firstname === firstname && client.email === email)
    const auth = this.authService.login(client)
    if(auth == true){
      this.router.navigateByUrl("/main/home");
    }
    else{
      this.errorMessage = "Correspondance des champs incorrectes."
    }
  }
}
