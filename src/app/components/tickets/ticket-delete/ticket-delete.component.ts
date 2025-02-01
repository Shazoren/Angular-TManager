import { Component, Inject, OnInit } from '@angular/core';
import { Ticket } from '../../../model/tickets.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-delete',
  templateUrl: './ticket-delete.component.html',
  styleUrl: './ticket-delete.component.css'
})
export class TicketDeleteComponent implements OnInit {
  public errorMessage: string = '';

  constructor(
        @Inject(MAT_DIALOG_DATA) public ticket: Ticket,
        private dialogRef: MatDialogRef<TicketDeleteComponent>, 
        private ticketService: TicketService
      ) {}

  ngOnInit(): void {}

  closeEdit(): void {
    this.dialogRef.close();
  }

  handleDelete(): void {
    this.ticketService.deleteTicket(this.ticket.id).subscribe({
      error: (err) => { this.errorMessage = err.message },
      complete: () => { this.dialogRef.close(); }
    });
  }
}
