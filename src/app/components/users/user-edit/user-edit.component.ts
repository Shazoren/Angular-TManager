import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  public userEditForm!:FormGroup;
  public errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserEditComponent>, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.user;
    this.userEditForm=this.fb.group({
      firstname : this.fb.control('', [Validators.required]),
      lastname : this.fb.control('', [Validators.required]),
      email : this.fb.control(''),
      login : this.fb.control('', [Validators.required]),
      password : this.fb.control('', [Validators.required]),
      passwordAgain : this.fb.control('', [Validators.required])
    });

    //charger les données du formulaires
    this.userEditForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      login: user.login,
      password: user.password,
      passwordAgain: user.password,
    });
  }

  closeEdit(): void {
    this.dialogRef.close();
  }

  handleUpdate(): void {
    if (this.userEditForm.valid) {
      // s'assurer aussi que les 2 mdp sont égaux
      if(this.isUserPasswordCorrect()){
        const { passwordAgain, ...formValues } = this.userEditForm.value;
        const updatedUser: User = { id: this.user.id, ...formValues }
        updatedUser.role = this.user.role
        this.userService.updateUser(updatedUser).subscribe({
          error: (err) => { this.errorMessage = err.message },
          complete: () => { this.dialogRef.close(); }
        })
      }
    }
  }

  isUserPasswordCorrect(): boolean {
    if(this.userEditForm.value.password !== this.userEditForm.value.passwordAgain){
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
        return false
    }
    return true;
  }
}
