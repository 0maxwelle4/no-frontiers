import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit{

  allUsers: any[] = [];
  usersProfe: any[] = [];
  displayedUsers: any[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getAllUsers().subscribe( usersData => {
      this.allUsers = usersData;
      this.displayedUsers = this.allUsers;
      console.log(this.allUsers);
    })
  }

  filter(termino: string) {
    this.displayedUsers = this.allUsers.filter(user => user.name.toLowerCase().includes(termino.toLowerCase()));
  }

  deleteUser(id: any) {
    this.authService.deleteUserById(id).subscribe( response => {
      this.allUsers = this.allUsers.filter(user => user.user_id !== id);
      this.displayedUsers = this.displayedUsers.filter(user => user.user_id !== id);
    })

  }

}
