import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../../../model/tickets.model';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrl: './ticket-edit.component.css'
})
export class TicketEditComponent implements OnInit {
  public ticketEditForm!: FormGroup;
  public errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public ticket: Ticket, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TicketEditComponent>,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.ticketEditForm=this.fb.group({
      title : this.fb.control('', [Validators.required]),
      date : this.fb.control('', [Validators.required]),
      description : this.fb.control(''),
      isClosed : this.fb.control(false),
    });

    //charger les données du formulaires
    this.ticketEditForm.patchValue({
      title: this.ticket.title,
      date: this.ticket.date,
      description: this.ticket.description,
      isClosed: this.ticket.isClosed,
    });
  }

  closeEdit(): void {
    this.dialogRef.close();
  }

  handleUpdate(): void {
    if (this.ticketEditForm.valid) {
      const editTicket: Ticket = {
        id: this.ticket.id,
        clientID: this.ticket.clientID,
        userID: this.ticket.userID,
        ...this.ticketEditForm.value,
      }
      
      this.ticketService.updateTicket(editTicket).subscribe({
        error: (err) => { this.errorMessage = err.message },
        complete: () => { this.dialogRef.close(); }
      })
    }
  }
}
