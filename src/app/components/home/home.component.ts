import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { Client } from '../../model/client.model';
import { ClientService } from '../../services/client.service';
import { ProjectService } from '../../services/project.service';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../model/tickets.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public connectedUser : User | Client | undefined = undefined;
  public openedProjectCount : number = 0;
  public closedProjectCount : number = 0;
  public recentProjectCount : number = 0;
  public performanceProject : string = "";

  constructor(
    public authService : AuthenticationService, 
    private userService: UserService, 
    private clientService: ClientService,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    this.computeProjetsStats()

    if(this.authService.isUser()){
      this.userService.getUserById(this.authService.id!).subscribe(user => this.connectedUser = user[0])
    }
    if(this.authService.isClient()){
      this.clientService.getClientById(this.authService.id!).subscribe(client => this.connectedUser = client[0])
    }
  }

  computeProjetsStats() {
    const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    this.projectService.fillDefaultValues();
    this.projectService.projects$.subscribe({
      next: (projectList) => {
        this.openedProjectCount = projectList.filter(project => project.isClosed === false).length;
        this.closedProjectCount = projectList.filter(project => project.isClosed === true).length;
        this.recentProjectCount = projectList.filter(project => {
          const objDate = new Date(project.date).getTime();
          return Math.abs(now - objDate) <= oneWeekInMillis;
        }).length;
        this.performanceProject = projectList.length > 0 ? Math.round((this.closedProjectCount / projectList.length) * 100) + '%' : 'No Project';
      }
    })
  }
}
