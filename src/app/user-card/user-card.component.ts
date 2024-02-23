import { Component, EventEmitter, Input, Output} from '@angular/core';
import { User } from '../service/users-api.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() CardUser!: User;
  @Output() DeleteUser = new EventEmitter<number>();
 

  deleteClick(): void{
      this.DeleteUser.emit(this.CardUser.id);
    
  }
}
