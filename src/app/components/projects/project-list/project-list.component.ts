import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../../model/project.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';
import { openCustomizeDialog } from '../../../helper/dialog-helper';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectDeleteComponent } from '../project-delete/project-delete.component';
import { ProjectCreateComponent } from '../project-create/project-create.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  projects: MatTableDataSource<Project> = new MatTableDataSource<Project>([]);
  displayedColumns: string[] = ['id', 'date', 'name', 'description', 'isClosed'];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private projectService: ProjectService, public authService : AuthenticationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.authService.isAdmin()){
      this.displayedColumns.push('modify')
      this.displayedColumns.push('delete')
    }
    this.getProjects()
  }

  ngAfterViewInit() {
    this.projects.paginator = this.paginator;
    this.projects.sort = this.sort;
  }

  getProjects(): void {
    this.projectService.fillDefaultValues();
    this.projectService.projects$.subscribe(projects => this.projects.data = projects)
  }

  handleCreate(): void {
    const dialogRef = openCustomizeDialog(this.dialog, ProjectCreateComponent, '600px', this.projects.data)
    dialogRef.afterClosed().subscribe(() => {
      this.getProjects();
    });
  }

  handleEdit(Project: Project): void {
    const dialogRef = openCustomizeDialog(this.dialog, ProjectEditComponent, '1000px', Project)
    dialogRef.afterClosed().subscribe(() => {
      this.getProjects();
    });
  }
  

  handleDelete(Project: Project): void {
    const dialogRef = openCustomizeDialog(this.dialog, ProjectDeleteComponent, '600px', Project)
    dialogRef.afterClosed().subscribe(() => {
      this.getProjects();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projects.filter = filterValue.trim().toLowerCase();
  }
}
