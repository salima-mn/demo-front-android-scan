import { Component, OnInit } from '@angular/core';
import {ImeiService} from "../../../services/imei.service";
import {ImeiRequest} from "../../../models/ImeiRequest";
import {ImeiResponse} from "../../../models/ImeiResponse";
import Swal from "sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SendMailModalComponent} from "../send-mail-modal/send-mail-modal.component";
import {catchError, delay, finalize, tap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {
  generatedToken: any;

  imeiRequest:ImeiRequest=new ImeiRequest();
  isLoading= false;

  constructor(private imeiservice: ImeiService, private modalService: NgbModal) { }

  ngOnInit(): void {

  }


  generateToken(imeiRequest: ImeiRequest) {
    if(imeiRequest.imei_value == undefined) {
      Swal.fire('Error', 'La valeur de IMEI est null!Veuillez la saisir', 'error' )
      return;
    }else if (imeiRequest.imei_value !== imeiRequest.imei_pass) {
      Swal.fire('Error', 'La confirmation de l\'IMEI n\'est pas identique à sa valeur' , 'error' )
      return;
    }else if (imeiRequest.hour < 1 && imeiRequest.day < 1){
      Swal.fire('Error', 'La date minimum pour générer le token est une heure!' , 'error' )
      return;
    } else{
      this.isLoading=true;
      if(imeiRequest.hour == 0) imeiRequest.hour=1;
      console.log(imeiRequest)
      this.imeiRequest= imeiRequest;
      this.imeiservice.generateTokenManually(imeiRequest).pipe(
          delay(1000), // Remove it from your code (just for showing loading)
          //tap(() => this.modal.close()),
          catchError((err) => {
            //this.modal.dismiss(err);
            this.isLoading= false;
            document.getElementById('refresh').click();
            return of(undefined);
          }),
          finalize(() => {
            this.isLoading = false;
            document.getElementById('refresh').click();
          })
      )
          .subscribe((res:string) =>{
        console.log("res generated token : ",res.toString())
        if(res.startsWith("Cette IMEI")){
          this.isLoading= false;
          document.getElementById('refresh').click();
          Swal.fire('Error', 'Cet Imei n\'est pas dans la base! Veuillez l\'ajouter avant de créer son token', 'error' )
        }else{
          this.generatedToken=res;
          document.getElementById('refresh').click();
        }
      })
    }

  }


  download() {
    var file = new Blob([this.generatedToken], {type: '.txt'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, 'token');
    else { // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = 'token';
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  reinitialize() {
    this.imeiRequest=new ImeiRequest();
  }

    openMailDialog(imeiRequest: ImeiRequest) {
      if(this.generatedToken !== undefined){
        const ref= this.modalService.open(SendMailModalComponent)
        console.log("imei value : ", imeiRequest.imei_value)
        ref.componentInstance.imei_value= imeiRequest.imei_value;
        ref.componentInstance.message= this.generatedToken;
        /*ref.result.then(() =>{
          Swal.fire('Success', 'Email envoyé avec succés', 'success');
        })*/
       }else{
        Swal.fire('Error', 'Le token n\'est pas encore généré ', 'error' )
      }

    }
}
