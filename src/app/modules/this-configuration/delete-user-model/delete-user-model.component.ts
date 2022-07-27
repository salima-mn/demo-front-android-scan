import {Component, Input, OnInit} from '@angular/core';
import {of, Subscription} from "rxjs";
import {ImeiService} from "../../../services/imei.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {catchError, delay, finalize, tap} from "rxjs/operators";
import {UserService} from "../../../services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-delete-user-model',
  templateUrl: './delete-user-model.component.html',
  styleUrls: ['./delete-user-model.component.scss']
})
export class DeleteUserModelComponent implements OnInit {

  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteUser() {
    this.isLoading = true;
    const sb = this.userService.deleteUser(this.id).pipe(
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
      if(res == 0) {Swal.fire("Success","Suppression avec succés","success")}
      else Swal.fire("Error","Erreur lors la Suppression de l'utilisateur","error")
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
