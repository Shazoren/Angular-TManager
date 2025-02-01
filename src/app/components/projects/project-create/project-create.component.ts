import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../../model/project.model';
import { ClientService } from '../../../services/client.service';
import { ProjectService } from '../../../services/project.service';
import { Client } from '../../../model/client.model';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent implements OnInit {
  public projectCreateForm!: FormGroup;
  public errorMessage: string = '';
  public clients: Client[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public projects: Project[], 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectCreateComponent>, 
    private clientService: ClientService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => this.clients = this.filterClientList(clients));
    this.projectCreateForm=this.fb.group({
      date : this.fb.control('', [Validators.required]),
      name : this.fb.control('', [Validators.required]),
      description : this.fb.control(''),
      isClosed : this.fb.control(false),
      clients : this.fb.control([], [Validators.required]),
    });
  }

  // comme 1 client ne peut appartenir qu'a un projet à la fois on s'assure que la liste des clients affichées dans la dropdown
  // ne contient que des clients qui n'ont pas de projet
  filterClientList(clients: Client[]): Client[] {
    return clients.filter((client) => client.projectId === '')
  }

  closeCreate(): void {
    this.dialogRef.close();
  }

  handleCreate(): void {
    if (this.projectCreateForm.valid) {
      const { clients, ...formValues } = this.projectCreateForm.value;
      const newId = this.projects.length > 0 ? (parseInt(this.projects[this.projects.length-1].id) + 1).toString() : "1";
      this.clientService.getClientsByIds(clients).subscribe({
        next: (clientsList) => {
          // update l'attribut projectId de chaque client sélectionné
          clientsList.forEach((client) => {
            client.projectId = newId;
            this.clientService.updateClient(client).subscribe({error: (err) => { this.errorMessage = err.message }})
          })

          // créer l'objet du projet
          const createProject: Project = {
            id: newId,
            clients: clientsList,
            ...formValues
          };

          // creer le projet
          this.projectService.addProject(createProject).subscribe({
            error: (err) => { this.errorMessage = err.message },
            complete: () => { this.dialogRef.close(); }
          })
        }
      });
    }
  }
}
