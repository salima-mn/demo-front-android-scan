import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {of, Subscription} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {catchError, first, tap} from "rxjs/operators";
import {Imei} from "../../../models/imei";
import {ImeiService} from "../../../services/imei.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-imei-modal',
  templateUrl: './edit-imei-modal.component.html',
  styleUrls: ['./edit-imei-modal.component.scss']
})
export class EditImeiModalComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  imei: Imei;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
      private imeiService: ImeiService,
      private fb: FormBuilder, public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    //this.isLoading$ = this.customersService.isLoading$;
    this.loadImei();
  }

  loadImei() {
    if (!this.id) {
      this.imei = new Imei();
      this.loadForm();
    } else {
      const sb = this.imeiService.getImeiById(this.id).pipe(
          first(),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            return of(new Imei());
          })
      ).subscribe((imei: Imei) => {
        this.imei = imei;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      //imei: [this.imei.value, Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(15), Validators.maxLength(15)])],
      imei: [this.imei.value, Validators.compose([Validators.required,Validators.required, Validators.minLength(16), Validators.maxLength(16)])],
      name: [this.imei.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')])],
      surname: [this.imei.surname, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')])],
      email: [this.imei.email, Validators.compose([Validators.required, Validators.email])]
    }/*, {
      validator: MustMatch('imei', 'confirm_imei')
    }*/);
  }


  editOrSave() {
    this.prepareImei();
    if(this.imei.imei_id){
      console.log("imei to modify : ",this.imei)
      const sbUpdate = this.imeiService.updateImei(this.imei).pipe(
          tap(() => {
            this.modal.close();
          }),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            Swal.fire("Error","Erreur lors la mise à jour hors subscribe","error");
            return of(this.imei);
          }),
      ).subscribe(res =>{
        console.log("the res of update imei : ",res)
        if(res == true) Swal.fire("Success","Mise à jour avec succés","success")
        if(res == false) Swal.fire("Error","Erreur lors la mise à jour","error")
      });
      this.subscriptions.push(sbUpdate);
    }else{
      console.log("imei to create : ",this.imei)
      const sbCreate = this.imeiService.addImei(this.imei).pipe(
          tap(() => {
            this.modal.close();
          }),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            Swal.fire("Error","Erreur lors l'Ajout","error");
            return of(this.imei);
          }),
      ).subscribe(res =>{
        console.log("the res of create imei : ",res)
        if(res == true) Swal.fire("Success","Ajout avec succés","success")
        if(res == false) Swal.fire("Error","Erreur lors l'Ajout\n Vous avez dépassé le maximum des utilisateurs autorisés","error")
      });
      this.subscriptions.push(sbCreate);
    }

  }

  private prepareImei() {
    const formData = this.formGroup.value;
    this.imei.value = formData.imei;
    this.imei.password = formData.imei;
    this.imei.name = formData.name;
    this.imei.surname = formData.surname;
    this.imei.email= formData.email;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  isMutched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.errors.mustMatch;
  }
  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: false });
    } else {
      matchingControl.setErrors({ mustMatch: true });
    }
  }
}

