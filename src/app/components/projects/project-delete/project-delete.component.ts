import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../../model/project.model';
import { ProjectService } from '../../../services/project.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrl: './project-delete.component.css'
})
export class ProjectDeleteComponent implements OnInit {
  public errorMessage: string = '';

  constructor(
        @Inject(MAT_DIALOG_DATA) public project: Project,
        private dialogRef: MatDialogRef<ProjectDeleteComponent>, 
        private clientService: ClientService,
        private projectService: ProjectService,
      ) {}

  ngOnInit(): void {}

  closeEdit(): void {
    this.dialogRef.close();
  }

  handleDelete(): void {
    const clientIds = this.project.clients.map((client) => client.id)
    this.clientService.getClientsByIds(clientIds).subscribe({
      next: (clientsList) => {
        clientsList.forEach((client) => {
          client.projectId = ""
          this.clientService.updateClient(client).subscribe({error: (err) => { this.errorMessage = err.message }})
        })
        this.projectService.deleteProject(this.project.id).subscribe({
          error: (err) => { this.errorMessage = err.message },
          complete: () => { this.dialogRef.close(); }
        })
      }
    });
  }
}
