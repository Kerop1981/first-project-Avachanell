import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'createedituser',
  standalone: true,
  imports: [ MatFormFieldModule,ReactiveFormsModule,MatDialogModule,MatInputModule],
  templateUrl: './createedituser.component.html',
  styleUrl: './createedituser.component.css'
})
export class CreateedituserComponent {
  userForm!: FormGroup;

  constructor(
    private dialogRef : MatDialogRef<CreateedituserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean}
  ){
    this.userForm = this.fb.group({
      name:'',
      email: '',
      phone: '',
    });
  }

  onCancelClick(): void {
    this.dialogRef.close()
  }

  onSaveClick(): void {
    this.dialogRef.close(this.userForm.value)
  }
}

