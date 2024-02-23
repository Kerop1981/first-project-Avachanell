import { Injectable } from '@angular/core';
import { User } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = []; 
  constructor() { }

  setUsers(users:User[]): void{
    this.users = users
  }

    getUsers(): User[]{
      return this.users
   }

  deleteUser(id: number){
    this.users = this.users.filter(user => user.id !== id)
  }
}
