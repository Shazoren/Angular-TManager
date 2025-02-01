import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../../model/project.model';
import { ProjectService } from '../../../services/project.service';
import { Client } from '../../../model/client.model';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})
export class ProjectEditComponent implements OnInit {
  public projectEditForm!: FormGroup;
  public errorMessage: string = '';
  public selectedClientsId: string[] = [];
  public defaultSelectedClientsId: string [] = [];
  public clients: Client[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public project: Project, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectEditComponent>, 
    private projectService: ProjectService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => this.clients = this.filterClientList(clients))
    this.selectedClientsId = this.project.clients.map((client) => client.id)
    this.defaultSelectedClientsId = this.selectedClientsId
    this.initForm();
  }

  filterClientList(clients: Client[]): Client[] {
    return clients.filter((client) => client.projectId === '' || client.projectId === this.project.id)
  }

  initForm(): void {
    this.projectEditForm=this.fb.group({
      date : this.fb.control('', [Validators.required]),
      name : this.fb.control('', [Validators.required]),
      description : this.fb.control(''),
      isClosed : this.fb.control(false),
      clients : this.fb.control([], [Validators.required]),
    });

    this.projectEditForm.patchValue({
      date: this.project.date,
      name: this.project.name,
      description: this.project.description,
      isClosed: this.project.isClosed,
      clients: this.selectedClientsId,
    });
  }

  closeEdit(): void {
    this.dialogRef.close();
  }

  handleUpdate(): void {
    if (this.projectEditForm.valid) {
      const { clients, ...formValues } = this.projectEditForm.value;
      const combinedList: string[] = Array.from(new Set([...clients, ...this.defaultSelectedClientsId]));
      this.clientService.getClientsByIds(combinedList).subscribe({
        next: (clientsList) => {
          clientsList.forEach((client) => {
            client.projectId = clients.find((id: string) => id === client.id) ? this.project.id : "";
            this.clientService.updateClient(client).subscribe({error: (err) => { this.errorMessage = err.message }})
          })
          const updatedProjet: Project = {
            id: this.project.id,
            clients: clientsList.filter((client) => client.projectId === this.project.id),
            ...formValues
          };
          this.projectService.updateProject(updatedProjet).subscribe({
            error: (err) => { this.errorMessage = err.message },
            complete: () => { this.dialogRef.close(); }
          })
        }
      });
    }
  }
}
