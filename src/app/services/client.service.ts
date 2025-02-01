import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../model/client.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

    private clientUrl = "http://localhost:3000/clients"
  
    private clientSource = new BehaviorSubject<Client[]>([]);
    client$ = this.clientSource.asObservable();
  
    constructor(private http: HttpClient) { }
  
    fillDefaultValues(): void {
      this.getClients().subscribe({
        next: (Client) => this.clientSource.next(Client)
      })
    }
 
    getClients(): Observable<Client[]> {
      return this.http.get<Client[]>(this.clientUrl);
    }
  
    getClientById(id: string): Observable<Client[]> {
      return this.http.get<Client[]>(`${this.clientUrl}?id=${id}`);
    }

    getClientsByIds(ids: string[]): Observable<Client[]> {
      return this.getClients().pipe(
        map((clients) =>
          clients.filter((client) => ids.includes(client.id))
        )
      )
    }
 
    addClient(Client: Client): Observable<Client> {
      const allActualClients = this.clientSource.value;
      this.clientSource.next([...allActualClients, Client])
      return this.http.post<Client>(this.clientUrl, Client)
    }
  
    updateClient(Client: Client): Observable<Client> {
      return this.http.put<Client>(`${this.clientUrl}/${Client.id}`, Client)
    }
  
    deleteClient(id: string): Observable<Client> {
      const updatedClients = this.clientSource.value.filter(Client => Client.id !== id);
      this.clientSource.next(updatedClients);
      return this.http.delete<Client>(`${this.clientUrl}/${id}`);
    }
}
