import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { MainComponent } from './components/main/main.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserDeleteComponent } from './components/users/user-delete/user-delete.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { ClientCreateComponent } from './components/clients/client-create/client-create.component';
import { ClientEditComponent } from './components/clients/client-edit/client-edit.component';
import { ClientDeleteComponent } from './components/clients/client-delete/client-delete.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/projects/project-detail/project-detail.component';
import { LoginComponent } from './components/connexion/login/login.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectEditComponent } from './components/projects/project-edit/project-edit.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ProjectDeleteComponent } from './components/projects/project-delete/project-delete.component';
import { ProjectCreateComponent } from './components/projects/project-create/project-create.component';
import { TicketsComponent } from './components/tickets/tickets.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';

import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TicketListComponent } from './components/tickets/ticket-list/ticket-list.component';
import { TicketCreateComponent } from './components/tickets/ticket-create/ticket-create.component';
import { TicketEditComponent } from './components/tickets/ticket-edit/ticket-edit.component';
import { TicketDeleteComponent } from './components/tickets/ticket-delete/ticket-delete.component';
import { SignupComponent } from './components/connexion/signup/signup.component';
import { SignupClientComponent } from './components/connexion/signup/signup-client/signup-client.component';
import { SignupUserComponent } from './components/connexion/signup/signup-user/signup-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    UsersComponent,
    MainComponent,
    UserListComponent,
    UserEditComponent,
    UserCreateComponent,
    UserDeleteComponent,
    ClientsComponent,
    ClientListComponent,
    ClientCreateComponent,
    ClientEditComponent,
    ClientDeleteComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectListComponent,
    ProjectEditComponent,
    ConnexionComponent,
    ProjectDeleteComponent,
    ProjectCreateComponent,
    TicketsComponent,
    TicketListComponent,
    TicketCreateComponent,
    TicketEditComponent,
    TicketDeleteComponent,
    SignupComponent,
    SignupClientComponent,
    SignupUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatListModule,
  ],
  providers: [
    AuthGuard,
    AuthorizationGuard,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
