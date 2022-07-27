import {Component, Input, OnInit} from '@angular/core';
import {of, Subscription} from "rxjs";
import {CustomersService} from "../../e-commerce/_services";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {catchError, delay, finalize, tap} from "rxjs/operators";
import {ImeiService} from "../../../services/imei.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-delete-imei-modal',
  templateUrl: './delete-imei-modal.component.html',
  styleUrls: ['./delete-imei-modal.component.scss']
})
export class DeleteImeiModalComponent implements OnInit {

  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private imeiService: ImeiService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteImei() {
    this.isLoading = true;
    const sb = this.imeiService.deleteImei(this.id).pipe(
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
      if(res == true) {Swal.fire("Success","Suppression avec succés","success")}
      else Swal.fire("Error","Erreur lors la Suppression de l'IMEI","error")
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
