import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { LoginComponent } from './components/connexion/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ClientsComponent } from './components/clients/clients.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SignupComponent } from './components/connexion/signup/signup.component';

const routes: Routes = [
  {path : "", component : ConnexionComponent},
  {path : "login", component : LoginComponent},
  {path : "signup", component : SignupComponent},

  {path : "main", component : MainComponent, canActivate : [AuthGuard],
    children : [
      {path : "home", component : HomeComponent},
      {path : "users", component : UsersComponent},
      {path : "projects", component : ProjectsComponent},
      {path : "clients", component : ClientsComponent},
      {path : "tickets", component : TicketsComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
