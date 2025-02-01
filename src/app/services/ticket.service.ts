import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from '../model/tickets.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketUrl = "http://localhost:3000/tickets"

  private ticketSource = new BehaviorSubject<Ticket[]>([]);
  ticket$ = this.ticketSource.asObservable();

  constructor(private http: HttpClient) { }

  fillDefaultValues(): void {
    this.getTickets().subscribe({
      next: (ticket) => this.ticketSource.next(ticket)
    })
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketUrl);
  }

  getTicketById(id: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.ticketUrl}?id=${id}`);
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    const allActualUsers = this.ticketSource.value;
    this.ticketSource.next([...allActualUsers, ticket])
    return this.http.post<Ticket>(this.ticketUrl, ticket)
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.ticketUrl}/${ticket.id}`, ticket)
  }

  deleteTicket(id: string): Observable<Ticket> {
    const updatedTickets = this.ticketSource.value.filter(ticket => ticket.id !== id);
    this.ticketSource.next(updatedTickets);
    return this.http.delete<Ticket>(`${this.ticketUrl}/${id}`);
  }
}
