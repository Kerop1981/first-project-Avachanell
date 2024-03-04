import {Component, OnInit} from '@angular/core';
import { UsersApiService } from '../service/users-api.service'; 
import {UserCardComponent} from '../user-card/user-card.component';
import { User } from '../service/users-api.service'; 
import {CommonModule} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { CreateedituserComponent } from '../createedituser/createedituser.component';
import { UserService } from '../service/user.service'; 
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  imports: [UserCardComponent, CommonModule, MatButtonModule],
  providers: [UsersApiService],
})
export class UsersListComponent implements OnInit {
  users!: User[];

  constructor(
    private UsersApiService: UsersApiService,
    private UserService: UserService,
    private dialog: MatDialog,
  ) {
  }


  openDialog() {
    const dialogRef = this.dialog.open(CreateedituserComponent,
      {
        width: '300px',
        data: {id: this.users.length + 1}
      },
    );
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.users = this.UserService.getItem();
      }
    });
  }

  editUser(userEdit: User) {
    const dialogRef = this.dialog.open(CreateedituserComponent, {
      width: '300px',
      data: {user: {...userEdit}, isEdit: true},
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.users = this.UserService.getItem();
      }
    });
  }

  loadUsers() {
    this.users = this.UserService.getItem() || [];
    if (this.users.length === 0) {
      this.UsersApiService.getUsers().subscribe((value) => {
        this.users = value.map(user => ({...user}));
        this.UserService.setItem('users', this.users);
      });
    }
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  deleteUser(userDelete: User): void {
    const index = this.users.findIndex((user) => user.id === userDelete.id);

    if (index !== -1) {
      this.users.splice(index, 1);
      this.UserService.setItem('users', this.users);
    }
  }
}