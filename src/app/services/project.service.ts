import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../model/project.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  private projectUrl = "http://localhost:3000/projects"

  private projectSource = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectSource.asObservable();

  constructor(private http: HttpClient) { }

  fillDefaultValues(): void {
    this.getProjects().subscribe({
      next: (project) => this.projectSource.next(project)
    })
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }

  getProjectById(id: string): Observable<Project[]> {
    if(id === "") return new Observable<[]>
    return this.http.get<Project[]>(`${this.projectUrl}?id=${id}`);
  }

  getProjectsByIds(ids: string[]): Observable<Project[]> {
    return this.getProjects().pipe(
      map((projects) =>
        projects.filter((project) => ids.includes(project.id))
      )
    );
  }

  addProject(user: Project): Observable<Project> {
    const allActualUsers = this.projectSource.value;
    this.projectSource.next([...allActualUsers, user])
    return this.http.post<Project>(this.projectUrl, user)
  }

  updateProject(user: Project): Observable<Project> {
    return this.http.put<Project>(`${this.projectUrl}/${user.id}`, user)
  }

  deleteProject(id: string): Observable<Project> {
    const updatedUsers = this.projectSource.value.filter(user => user.id !== id);
    this.projectSource.next(updatedUsers);
    return this.http.delete<Project>(`${this.projectUrl}/${id}`);
  }
}
