import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../../model/client.model';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ClientService } from '../../../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrl: './signup-client.component.css'
})
export class SignupClientComponent implements OnInit {
  public signUpClientFormGroup! : FormGroup;
  private clients: Client[] = [];
  public errorMessage: string = '';

  constructor(private fb : FormBuilder,
              private authService : AuthenticationService,
              private clientService: ClientService,
              private router : Router) {
  }
  
  ngOnInit() {
    // on s'assure que l'user est bien passé par la page principale de connexion
    if(this.authService.profile){
      this.signUpClientFormGroup = this.fb.group({
        lastname : this.fb.control('', [Validators.required]),
        firstname : this.fb.control('', [Validators.required]),
        phoneNumber : this.fb.control(''),
        email : this.fb.control('', [Validators.required]),
      });
      this.clientService.fillDefaultValues();
      this.clientService.client$.subscribe(clients => this.clients = clients)
    }
    else{
      this.router.navigateByUrl("/");
    }
  }

  userSignUp() {
    if (this.signUpClientFormGroup.valid) {
      const nameForm = this.signUpClientFormGroup.value.lastname;
      const firstnameForm = this.signUpClientFormGroup.value.firstname;
      const emailForm = this.signUpClientFormGroup.value.email;
      const existingClient = this.clients.find((client) => client.lastname === nameForm && client.firstname === firstnameForm && client.email === emailForm);
      const newId = this.clients.length > 0 ? (parseInt(this.clients[this.clients.length-1].id) + 1).toString() : "1";
      const auth = this.authService.signin(existingClient, newId)
      if(auth) {
        const newClient = {id: newId, projectId: "", ...this.signUpClientFormGroup.value};
        this.clientService.addClient(newClient).subscribe({
          complete: () => { this.router.navigateByUrl("/main/home") },
          error: (err) => { alert(err.message); },
        })
      }
      else{
        this.errorMessage = "Client déjà existant."
      }
    }
  }
}
