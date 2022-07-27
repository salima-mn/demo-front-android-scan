import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditUserModelComponent} from "../edit-user-model/edit-user-model.component";
import {DeleteUserModelComponent} from "../delete-user-model/delete-user-model.component";
import {DeleteImeiModalComponent} from "../../android-configuration/delete-imei-modal/delete-imei-modal.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    listUsers: Array<User>;

  constructor(private userService:UserService, private modal:NgbModal) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
     this.userService.getUsers().subscribe((res:User[]) =>{
       console.log("list users : ",res)
       this.listUsers=res;
       document.getElementById('refresh').click();
     });
  }

  edit(user: User) {
    console.log(user);
    const modalRef = this.modal.open(EditUserModelComponent, {size: 'lg'});
    modalRef.componentInstance.id= user.id;
    modalRef.result.then( ()=>{
      this.getAllUsers()
    }, () =>{})
  }

  delete(user: User) {
    const modalRef = this.modal.open(DeleteUserModelComponent);
    modalRef.componentInstance.id = user.id;
    modalRef.result.then(() => this.getAllUsers(), () => { });
  }

  create() {
     this.edit(new User());
  }

  justRefresh() {
     console.log('Just refresh list of users...');
  }
}
