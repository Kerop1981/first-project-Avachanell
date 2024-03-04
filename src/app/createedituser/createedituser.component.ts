import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogActions,MatDialogContent,MatDialogRef,MatDialogTitle} from '@angular/material/dialog';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { UserService } from '../service/user.service';
@Component({
  selector: 'createedituser',
  standalone: true,
  imports: [   
    MatInputModule,
    FormsModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogContent,
    MatDialogTitle],
  templateUrl: './createedituser.component.html',
  styleUrl: './createedituser.component.css'
})
export class CreateedituserComponent  {
  newUser: any = {  name: '', email: '', phone: '' };

  constructor(
    public dialogRef: MatDialogRef<CreateedituserComponent>,
    private UserService : UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data?.user){
      this.newUser = data.user
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    if(this.newUser?.id){
      this.UserService.updateUser(this.newUser);
      this.dialogRef.close(true);
      return
    }
    this.UserService.createUser({...this.newUser, id: this.data.id});
    this.dialogRef.close(true);
  }

}


