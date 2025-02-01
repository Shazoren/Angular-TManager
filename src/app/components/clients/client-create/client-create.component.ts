import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../model/client.model';
import { ClientService } from '../../../services/client.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../model/project.model';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css'
})
export class ClientCreateComponent implements OnInit {
  public clientCreateForm!: FormGroup;
  public errorMessage: string = '';
  public projects : Project[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public clients: Client[], 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientCreateComponent>, 
    private clientService: ClientService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
    this.clientCreateForm=this.fb.group({
      lastname : this.fb.control('', [Validators.required]),
      firstname : this.fb.control('', [Validators.required]),
      phoneNumber : this.fb.control(''),
      email : this.fb.control('', [Validators.required]),
      projectId : this.fb.control(''),
    });
  }

  closeCreate(): void {
    this.dialogRef.close();
  }

  handleCreate(): void {
    if (this.clientCreateForm.valid) {
      const newId = this.clients.length > 0 ? (parseInt(this.clients[this.clients.length-1].id) + 1).toString() : "1";
      const clientCreate: Client = { id: newId, ...this.clientCreateForm.value }

      if(this.clientCreateForm.value.projectId !== ""){
        const selectedProject = this.projects.find((project) => project.id === this.clientCreateForm.value.projectId)
        if(selectedProject){
          selectedProject.clients.push(clientCreate);
          this.projectService.updateProject(selectedProject).subscribe({
            error: (err) => { this.errorMessage = err.message },
            complete: () => { this.dialogRef.close(); }
          });
        }
      }
      
      this.clientService.addClient(clientCreate).subscribe({
        error: (err) => { this.errorMessage = err.message },
        complete: () => { this.dialogRef.close(); }
      });
    }
  }
}
