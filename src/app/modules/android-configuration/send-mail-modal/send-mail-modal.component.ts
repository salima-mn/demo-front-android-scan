import {Component, Input, OnInit} from '@angular/core';
import {ImeiService} from "../../../services/imei.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {of, Subscription} from "rxjs";
import {catchError, delay, finalize, tap} from "rxjs/operators";
import Swal from "sweetalert2";
import {EmailService} from "../../../services/email.service";
import {EmailSortant} from "../../../models/emailSortant";

@Component({
  selector: 'app-send-mail-modal',
  templateUrl: './send-mail-modal.component.html',
  styleUrls: ['./send-mail-modal.component.scss']
})
export class SendMailModalComponent implements OnInit {

  @Input() imei_value;
  @Input() message;
  isLoading: any;
  email:string;
  subscriptions: Subscription[] = [];

  emailSortant: EmailSortant= new EmailSortant();

  constructor(private imeiServeice:ImeiService, public modal: NgbActiveModal, private emailService:EmailService) { }

  ngOnInit(): void {
     this.getImeiByValue();
  }

  getImeiByValue(){
    console.log('imei value in modal : ',this.imei_value)
    this.imeiServeice.getImeiByValue(this.imei_value).subscribe(res=>{
      console.log(res)
      this.email = res.email;
    })
  }

  sendMail() {
    this.isLoading = true;
    this.emailSortant.destination= this.email;
    this.emailSortant.message= this.message
    const sb = this.emailService.sendMail(this.emailSortant).pipe(
        delay(1000), // Remove it from your code (just for showing loading)
        tap(() => this.modal.close()),
        catchError((err) => {
          this.modal.dismiss(err);
          return of(undefined);
        }),
        finalize(() => {
          this.isLoading = false;
        })
    ).subscribe(res =>{
      if(res == 0) {Swal.fire("Success","Email envoyé avec succés","success")}
      else Swal.fire("Error","Erreur lors l'envoi de l'Email","error")
    });
    this.subscriptions.push(sb);

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
