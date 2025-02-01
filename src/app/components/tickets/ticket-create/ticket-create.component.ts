import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../../../model/tickets.model';
import { TicketService } from '../../../services/ticket.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrl: './ticket-create.component.css'
})
export class TicketCreateComponent implements OnInit {
  public ticketCreateForm!: FormGroup;
  public errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public tickets: Ticket[], 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TicketCreateComponent>, 
    private ticketService: TicketService,
    private authService : AuthenticationService
  ) {}

  ngOnInit(): void {
    this.ticketCreateForm=this.fb.group({
      title : this.fb.control('', [Validators.required]),
      date : this.fb.control('', [Validators.required]),
      description : this.fb.control('', [Validators.required]),
    });
  }

  closeCreate(): void {
    this.dialogRef.close();
  }

  handleCreate(): void {
    if (this.ticketCreateForm.valid) {
      const newId = this.tickets.length > 0 ? (parseInt(this.tickets[this.tickets.length-1].id) + 1).toString() : "1";
      const ticketCreate: Ticket = { 
        id: newId, 
        isClosed: false, 
        clientID: this.authService.isClient() ? this.authService.id : null,
        userID: this.authService.isUser() ? this.authService.id : null,
        ...this.ticketCreateForm.value 
      }
        this.ticketService.addTicket(ticketCreate).subscribe({
          error: (err) => { this.errorMessage = err.message },
          complete: () => { this.dialogRef.close(); }
        })
    }
  }
}