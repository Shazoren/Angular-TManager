import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../model/client.model';
import { ClientService } from '../../../services/client.service';
import { Project } from '../../../model/project.model';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent implements OnInit{
  public clientEditForm!: FormGroup;
  public errorMessage: string = '';
  public defaultSelectedProjectId: string = '';
  public projects : Project[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public client: Client, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientEditComponent>, 
    private clientService: ClientService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    const client = this.client;
    this.defaultSelectedProjectId = client.projectId;
    this.projectService.getProjects().subscribe((projects) => this.projects = projects);
    this.clientEditForm=this.fb.group({
      firstname : this.fb.control('', [Validators.required]),
      lastname : this.fb.control('', [Validators.required]),
      phoneNumber : this.fb.control(''),
      email : this.fb.control('', [Validators.required]),
      projectId : this.fb.control(''),
    });

    this.clientEditForm.patchValue({
      firstname: client.firstname,
      lastname: client.lastname,
      phoneNumber: client.phoneNumber,
      email: client.email,
      projectId: client.projectId
    });
  }

  updateProjects(projectList: Project[], selectedProjectId: string, updatedClient: Client): void {
    projectList.forEach((project) => {
      if(project.id === selectedProjectId){
        project.clients.find((client) => client.id === this.client.id) ? '' : project.clients.push(updatedClient)
      }
      else{
        project.clients = project.clients.filter((client) => client.id !== this.client.id)
      }
      this.projectService.updateProject(project).subscribe({error: (err) => { this.errorMessage = err.message }})
    })
  }
  
  closeEdit(): void {
    this.dialogRef.close();
  }

  

  handleUpdate(): void {
    if (this.clientEditForm.valid) {
      const selectedProjectId = this.clientEditForm.value.projectId
      const combinedList: string[] = Array.from(new Set([selectedProjectId, this.defaultSelectedProjectId]));
      this.projectService.getProjectsByIds(combinedList).subscribe({
        next: (projectList) => {
          const updatedClient: Client = {
            id: this.client.id,
            ...this.clientEditForm.value
          };
          if(this.defaultSelectedProjectId !== selectedProjectId){
            this.updateProjects(projectList, selectedProjectId, updatedClient)
          }
          this.clientService.updateClient(updatedClient).subscribe({
            error: (err) => { this.errorMessage = err.message },
            complete: () => { this.dialogRef.close(); }
          })
        }
      });
    }
  }
}
