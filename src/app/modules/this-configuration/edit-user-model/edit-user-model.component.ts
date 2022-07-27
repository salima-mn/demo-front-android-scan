import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../services/user.service";
import {catchError, tap} from "rxjs/operators";
import Swal from "sweetalert2";
import {of} from "rxjs";

@Component({
  selector: 'app-edit-user-model',
  templateUrl: './edit-user-model.component.html',
  styleUrls: ['./edit-user-model.component.scss']
})
export class EditUserModelComponent implements OnInit {

  @Input() id:number;

  user:User;
  isLoading$: any;

  formGroup: FormGroup;

  constructor(private fb:FormBuilder, public modal: NgbActiveModal, private userService:UserService) {
     // this.loadForm();
  }

  ngOnInit(): void {
   this.getUser();
  }

  getUser() {
    if(!this.id){
      this.user=new User();
      this.loadForm();
    }else{
      this.userService.getUserById(this.id).subscribe(res =>{
        this.user = res;
        this.loadForm();
      })
    }
  }

  private prepareUser() {
    const formData = this.formGroup.value;
    this.user.firstName = formData.firstName;
    this.user.password = formData.password;
    this.user.lastName = formData.lastName;
    this.user.userName = formData.userName;
    this.user.email= formData.email;
  }

  loadForm() {
    this.formGroup= this.fb.group({
      lastName: [this.user.lastName, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]*$'),Validators.minLength(3)])],
      firstName: [this.user.firstName, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$'), Validators.minLength(3)])],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      userName: [this.user.userName, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      password: [this.user.password, Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  editOrSave() {
    this.prepareUser();
    console.log("user to modify : ",this.user)
    const sbUpdate = this.userService.createOrUpdateUser(this.user).pipe(
        tap(() => {
          this.modal.close();
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          Swal.fire("Error","Erreur lors la mise à jour","error");
          return of(this.user);
        }),
    ).subscribe(res =>{
      console.log("the res of update user : ",res)
      if(res == 0) {Swal.fire("Success","Mise à jour avec succés","success")}
      else Swal.fire("Error","Erreur lors la mise à jour","error")
    });
    //this.subscriptions.push(sbUpdate);

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
