import { Component, Input, OnInit } from '@angular/core';
import { User, UsersApiService } from '../service/users-api.service';
import { UserService } from '../service/user.service';
import { UserCardComponent } from "../user-card/user-card.component";
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
@Component({
    selector: 'users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.css',
    imports: [CommonModule, UserCardComponent]
})
export class UsersListComponent implements OnInit{
  users!: Observable<User[]>

constructor(
  private UsersApiService:UsersApiService,
  private UserService:UserService){ }


ngOnInit(): void {
  this.users = this.UsersApiService.getUsers()
  }


deleteUser(id: number): void {
  this.UserService.deleteUser(id);
  this.users = this.users.pipe(map(users => users.filter(user => user.id !== id))
  );
}
}