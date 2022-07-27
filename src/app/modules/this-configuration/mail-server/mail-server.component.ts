import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Email} from "../../../models/email";
import {EmailService} from "../../../services/email.service";

@Component({
  selector: 'app-mail-server',
  templateUrl: './mail-server.component.html',
  styleUrls: ['./mail-server.component.scss']
})
export class MailServerComponent implements OnInit {
  email: Email= new Email();
  mode: number;
  newEmail: Email= new Email();

  constructor(private mailService:EmailService) { }

  ngOnInit(): void {
    this.getFirstOne();

  }

  getFirstOne(){
    this.mailService.getMailServers().subscribe(res =>{
      if(res !== null){
        this.email=res;
        if(document.getElementById('refresh') != null && document.getElementById('cancel')!= null){
          document.getElementById('refresh').click();
          document.getElementById('cancel').click();
        }

      }else{
        this.email=null;
        if(document.getElementById('refresh') != null && document.getElementById('cancel')!= null) {
          document.getElementById('refresh').click();
          document.getElementById('cancel').click();
        }
      }

    })
  }

  updateMailServer(email: Email) {
    this.mode=2;
    this.newEmail=email;

  }

  createMailServer() {
    this.mode=1;
    this.newEmail= new Email();

  }

  deleteMail(email: Email) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mailService.deleteMailServer(email).subscribe(res =>{
          if(res == 0){
            this.getFirstOne();
            this.mode= 0;
            Swal.fire(
              'Deleted!',
              'This Mail Server has been deleted.',
              'success'
            ).then(()=>{
              this.getFirstOne();
              document.getElementById('cancel').click();
            })
          }else {
            Swal.fire(
              'Problem!',
              'Problem when deleting this Mail Server!',
              'error'
            ).then(()=>{
              this.getFirstOne();
              document.getElementById('cancel').click();
            })
          }
        })

      }
    })

  }


  addOrUpdateEmail(email: Email) {
    console.log("mail to update/add : ",email)
    this.mailService.addOrUpdateMailSever(email).subscribe(res =>{
      if(res === 0){
        if(this.mode == 2){
          Swal.fire(
              'Success',
              'This Mail Server has been successfully updated.',
              'success'
          ).then(res=>{
            document.getElementById('cancel').click();
            this.getFirstOne();
            this.mode=0;
          })

        }else if(this.mode == 1){
          Swal.fire(
              'Success',
              'This Mail Server has been successfully created.',
              'success'
          ).then(res=>{
            document.getElementById('cancel').click();
            this.getFirstOne();
            this.mode=0;
          })
        }

      }
    },error1 => {
      if(this.mode == 2){
      Swal.fire(
          'Problem!',
          'Problem when updating this Mail Server!',
          'error'
      )
      }else if(this.mode == 1){
        Swal.fire(
            'Problem!',
            'Problem when creating this Mail Server!',
            'error'
        )
      }
    })
  }

  annuler() {
    this.mode=0;
  }

    justRefresh() {
        console.log("just refresh list server mail...")
    }
}
