import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../model/client.model';
import { Project } from '../../../model/project.model';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  public project: Project | null = null

  constructor(
    @Inject(MAT_DIALOG_DATA) public client: Client,
    private dialogRef: MatDialogRef<ProjectDetailComponent>,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjectById(this.client.projectId).subscribe((project) => this.project = project[0]);
  }

  close(): void {
    this.dialogRef.close();
  }
}
