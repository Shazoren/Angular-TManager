import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../model/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../model/role';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit{
  public userCreateForm!: FormGroup;
  public errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public users: User[], 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserCreateComponent>, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userCreateForm=this.fb.group({
      lastname : this.fb.control('', [Validators.required]),
      firstname : this.fb.control('', [Validators.required]),
      email : this.fb.control(''),
      login : this.fb.control('', [Validators.required]),
      password : this.fb.control('', [Validators.required]),
    });
  }

  closeCreate(): void {
    this.dialogRef.close();
  }

  handleCreate(): void {
    if (this.userCreateForm.valid) {
      const newId = this.users.length > 0 ? (parseInt(this.users[this.users.length-1].id) + 1).toString() : "1";
      const userCreate: User = { id: newId, ...this.userCreateForm.value }
      userCreate.role = Role.USER
        this.userService.addUser(userCreate).subscribe({
          error: (err) => { this.errorMessage = err.message },
          complete: () => { this.dialogRef.close(); }
        })
    }
  }
}
