import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../model/user.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { DataTable } from 'simple-datatables';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { openCustomizeDialog } from '../../../helper/dialog-helper';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
    users: MatTableDataSource<User> = new MatTableDataSource<User>([]);
    displayedColumns: string[] = ['id', 'lastname', 'firstname', 'login', 'email'];
  
    @ViewChild(MatPaginator) paginator! : MatPaginator;
    @ViewChild(MatSort) sort! : MatSort;
  
    constructor(private userService: UserService, public authService : AuthenticationService, private dialog: MatDialog) { }
  
    ngOnInit(): void {
      if(this.authService.isAdmin()){
        this.displayedColumns.push('modify')
        this.displayedColumns.push('delete')
      }
      this.getUsers()
    }
  
    ngAfterViewInit() {
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    }
  
    getUsers(): void {
      this.userService.fillDefaultValues();
      this.userService.users$.subscribe(users => this.users.data = users)
    }

    handleCreate(): void {
      const dialogRef = openCustomizeDialog(this.dialog, UserCreateComponent, '600px', this.users.data)
      dialogRef.afterClosed().subscribe(() => {
        this.getUsers();
      });
    }
  
    handleEdit(user: User): void {
      const dialogRef = openCustomizeDialog(this.dialog, UserEditComponent, '1000px', user)
      dialogRef.afterClosed().subscribe(() => {
        this.getUsers();
      });
    }
    
  
    handleDelete(user: User): void {
      const dialogRef = openCustomizeDialog(this.dialog, UserDeleteComponent, '600px', user)
      dialogRef.afterClosed().subscribe(() => {
        this.getUsers();
      });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.users.filter = filterValue.trim().toLowerCase();
    }
  
  //   users: User[] = [];
  //   table!: DataTable;
  
  //   constructor(private userService: UserService) {}
  
  //   ngOnInit(): void {
  //     this.getUsers();
  //   }
  
  //   getUsers(): void {
  //   this.userService.fillDefaultValues();
  //   this.userService.users$.subscribe(users => {
  //     this.users = users;
  //   });
  // }
  
  //   ngAfterViewInit(): void {
  //     // Initialiser Simple-DataTables après que le DOM ait été rendu
  //     setTimeout(() => {
  //       this.table = new DataTable("#userTable", {
  //         searchable: true,
  //         perPage: 10,
  //         perPageSelect: [5, 10, 20, 40],
  //         labels: {
  //           placeholder: "Rechercher...",
  //           perPage: " utilisateurs par page",
  //           noRows: "Aucun utilisateur trouvé",
  //           info: "Affichage de {start} à {end} sur {rows} utilisateurs"
  //         }
  //       });
  //     }, 100);
  //   }
  
  //   handleDelete(user: User): void {
  //     if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
  //       this.userService.deleteUser(user.id).subscribe({
  //         error: (err) => {
  //           alert("Erreur lors de la suppression : " + err.message);
  //         },
  //         complete: () => {
  //           // Mettre à jour la liste des utilisateurs
  //           this.table.update();
  //         },
  //       });
  //     }
  //   }
}
