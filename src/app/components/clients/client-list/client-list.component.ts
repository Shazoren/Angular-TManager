import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../../model/client.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from '../../../services/client.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { openCustomizeDialog } from '../../../helper/dialog-helper';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { ClientDeleteComponent } from '../client-delete/client-delete.component';
import { ProjectDetailComponent } from '../../projects/project-detail/project-detail.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  clients: MatTableDataSource<Client> = new MatTableDataSource<Client>([]);
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'phoneNumber', 'email'];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private clientService: ClientService, public authService : AuthenticationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.authService.isAdmin()){
      this.displayedColumns.push('modify')
      this.displayedColumns.push('delete')
    }
    this.getClients()
  }

  ngAfterViewInit() {
    this.clients.paginator = this.paginator;
    this.clients.sort = this.sort;
  }

  getClients(): void {
    this.clientService.fillDefaultValues();
    this.clientService.client$.subscribe(clients => this.clients.data = clients)
  }

  handleCreate(): void {
    const dialogRef = openCustomizeDialog(this.dialog, ClientCreateComponent, '600px', this.clients.data)
    dialogRef.afterClosed().subscribe(() => {
      this.getClients();
    });
  }

  handleEdit(client: Client): void {
    const dialogRef = openCustomizeDialog(this.dialog, ClientEditComponent, '1000px', client)
    dialogRef.afterClosed().subscribe(() => {
      this.getClients();
    });
  }
  

  handleDelete(client: Client): void {
    const dialogRef = openCustomizeDialog(this.dialog, ClientDeleteComponent, '600px', client)
    dialogRef.afterClosed().subscribe(() => {
      this.getClients();
    });
  }

  handleSeeProject(client: Client) {
    openCustomizeDialog(this.dialog, ProjectDetailComponent, '500px', client)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clients.filter = filterValue.trim().toLowerCase();
  }
}
