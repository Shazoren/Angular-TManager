import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from '../../../model/tickets.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TicketService } from '../../../services/ticket.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { openCustomizeDialog } from '../../../helper/dialog-helper';
import { TicketCreateComponent } from '../ticket-create/ticket-create.component';
import { TicketEditComponent } from '../ticket-edit/ticket-edit.component';
import { TicketDeleteComponent } from '../ticket-delete/ticket-delete.component';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit {
  tickets: MatTableDataSource<Ticket> = new MatTableDataSource<Ticket>([]);
  displayedColumns: string[] = ['id', 'title', 'date', 'description', 'isClosed'];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private ticketService: TicketService, public authService : AuthenticationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.authService.isAdmin()){
      this.displayedColumns.push('modify')
      this.displayedColumns.push('delete')
    }
    this.getTickets()
  }

  ngAfterViewInit() {
    this.tickets.paginator = this.paginator;
    this.tickets.sort = this.sort;
  }

  getTickets(): void {
    this.ticketService.fillDefaultValues();
    this.ticketService.ticket$.subscribe(tickets => this.tickets.data = tickets)
  }

  handleCreate(): void {
    const dialogRef = openCustomizeDialog(this.dialog, TicketCreateComponent, '600px', this.tickets.data)
    dialogRef.afterClosed().subscribe(() => {
      this.getTickets();
    });
  }

  handleEdit(ticket: Ticket): void {
    const dialogRef = openCustomizeDialog(this.dialog, TicketEditComponent, '1000px', ticket)
    dialogRef.afterClosed().subscribe(() => {
      this.getTickets();
    });
  }
  

  handleDelete(ticket: Ticket): void {
    const dialogRef = openCustomizeDialog(this.dialog, TicketDeleteComponent, '600px', ticket)
    dialogRef.afterClosed().subscribe(() => {
      this.getTickets();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tickets.filter = filterValue.trim().toLowerCase();
  }
}
