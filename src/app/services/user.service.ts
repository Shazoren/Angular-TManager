import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = "http://localhost:3000/users"

  private userSource = new BehaviorSubject<User[]>([]);
  users$ = this.userSource.asObservable();

  constructor(private http: HttpClient) { }

  fillDefaultValues(): void {
    this.getUsers().subscribe({
      next: (user) => this.userSource.next(user)
    })
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
  getUserById(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}?id=${id}`);
  }
  addUser(user: User): Observable<User> {
    const allActualUsers = this.userSource.value;
    this.userSource.next([...allActualUsers, user])
    return this.http.post<User>(this.userUrl, user)
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user)
  }
  deleteUser(id: string): Observable<User> {
    const updatedUsers = this.userSource.value.filter(user => user.id !== id);
    this.userSource.next(updatedUsers);
    return this.http.delete<User>(`${this.userUrl}/${id}`);
  }
}
