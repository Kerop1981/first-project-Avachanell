import { Component, OnInit } from '@angular/core';
import { User, UsersApiService,} from '../service/users-api.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateedituserComponent } from '../createedituser/createedituser.component';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { UserCardComponent } from "../user-card/user-card.component";
import { CommonModule } from '@angular/common';
@Component({
    selector: 'users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.css',
    imports: [CreateedituserComponent, UserCardComponent,CommonModule]
})
export class UsersListComponent implements OnInit{
  users!: Observable<User[]>

constructor(
  private UsersApiService:UsersApiService,
  private UserService:UserService,
  private dialog: MatDialog,
  ){ }


ngOnInit(): void {
  this.users = this.UsersApiService.getUsers()
  }


deleteUser(id: number): void {
  this.UserService.deleteUser(id);
  
}

openMatDialog(){
  this.UsersApiService.getUsers().subscribe(users => {
    const dialogRef = this.dialog.open(CreateedituserComponent,{
      width: '300px',
      data:{id: users.length + 1 }
    });
  });
 }
} 