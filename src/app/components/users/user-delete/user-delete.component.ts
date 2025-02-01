import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css'
})
export class UserDeleteComponent implements OnInit {
  public errorMessage: string = '';

  constructor(
        @Inject(MAT_DIALOG_DATA) public user: User,
        private dialogRef: MatDialogRef<UserDeleteComponent>, 
        private userService: UserService
      ) {}

  ngOnInit(): void {}

  closeEdit(): void {
    this.dialogRef.close();
  }

  handleDelete(): void {
    this.userService.deleteUser(this.user.id).subscribe({
      error: (err) => { this.errorMessage = err.message },
      complete: () => { this.dialogRef.close(); }
    });
  }
}
