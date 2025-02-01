import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../model/client.model';
import { ClientService } from '../../../services/client.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrl: './client-delete.component.css'
})
export class ClientDeleteComponent implements OnInit{
  public errorMessage: string = '';

  constructor(
        @Inject(MAT_DIALOG_DATA) public client: Client,
        private dialogRef: MatDialogRef<ClientDeleteComponent>, 
        private clientService: ClientService,
        private projectService: ProjectService,
      ) {}

  ngOnInit(): void {}

  closeEdit(): void {
    this.dialogRef.close();
  }

  deleteClientFromProject(): void {

  }

  deleteClient():void {
    this.clientService.deleteClient(this.client.id).subscribe({
      error: (err) => { this.errorMessage = err.message },
      complete: () => { this.dialogRef.close(); }
    });
  }

  handleDelete(): void {
    if(this.client.projectId !== ""){
      this.projectService.getProjectById(this.client.projectId).subscribe({
        next: (projects) => {

          projects.forEach((project) => {
            project.clients = project.clients.filter((client) => client.id !== this.client.id)
            this.projectService.updateProject(project).subscribe({
              error: (err) => { this.errorMessage = err.message },
              complete: () => { this.dialogRef.close(); }
            });
          })

          this.deleteClient();
        }
      })
    }
    else{
      this.deleteClient();
    }
  }
}
