import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Imei} from "../../../models/imei";
import {ImeiService} from "../../../services/imei.service";
import Swal from "sweetalert2";
import {GroupingState, PaginatorState, SortState} from "../../../_metronic/shared/crud-table";
import {FormGroup} from "@angular/forms";
import {EditCustomerModalComponent} from "../../e-commerce/customers/components/edit-customer-modal/edit-customer-modal.component";
import {DeleteCustomerModalComponent} from "../../e-commerce/customers/components/delete-customer-modal/delete-customer-modal.component";
import {DeleteImeiModalComponent} from "../delete-imei-modal/delete-imei-modal.component";
import {EditImeiModalComponent} from "../edit-imei-modal/edit-imei-modal.component";

@Component({
  selector: 'app-imeis',
  templateUrl: './imeis.component.html',
  styleUrls: ['./imeis.component.scss']
})
export class ImeisComponent implements OnInit {


  closeModal: string;
  imei:Imei=new Imei();
  listImei:Imei[]=[];
  mode:number=1;

  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  //searchGroup: FormGroup;

  constructor(private modalService: NgbModal, private imeiService:ImeiService) {}


  ngOnInit(): void {

    this.getAllImeis();


  }

  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    //this.customerService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    //this.customerService.patchState({ paginator });
  }

  deleteSelected(){

  }

  justRefresh(){
    console.log('Refreshing list imeis!')
  }

  create() {
    this.edit(new Imei());
  }

  edit(imei: Imei) {
    console.log(imei);
    const modalRef = this.modalService.open(EditImeiModalComponent, { size: 'lg' });
    modalRef.componentInstance.id = imei.imei_id;
    modalRef.result.then(() =>
           this.getAllImeis(),
        () => { }
    );
  }

  getAllImeis(){
    this.imeiService.getAllImeis().subscribe((res:Imei[]) =>{
      console.log("res imei: ",res)
      this.listImei=res;
      this.listImei.forEach(imei =>{
       // console.log(imei.expiredToken.valueOf())
        //console.log(imei.expiredToken.getMinutes())
        /*console.log(imei.expiredToken.getDate())
        console.log(imei.expiredToken.getTime())
        console.log(imei.expiredToken.getMonth())
        console.log(imei.expiredToken.getDay())
        console.log(imei.expiredToken.getHours())
        console.log(imei.expiredToken.getFullYear())
        console.log(imei.expiredToken.getUTCDate())*/
      })
      document.getElementById('refresh').click();
    })
  }


  createAddModel(content) {
    this.mode=1;
    this.imei=new Imei();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  updateAddModel(content, imei) {
    this.mode=2;
    this.imei=imei;
    console.log("Imei to modify : ",this.imei)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  getStatus(imei: Imei):string {
    return 'En cours'; //expiré / initial
  }

  addOrUpdateImei(imei: Imei) {
    this.imeiService.updateImei(imei).subscribe(res =>{
      if(res == 0 && this.mode==1){
        this.getAllImeis();
        this.modalService.dismissAll();
        Swal.fire("Success","Ajout avec succés!","success");
      }
     else if(res == 0 && this.mode==2){
        this.getAllImeis();
        this.modalService.dismissAll();
        Swal.fire("Success","Modification avec succés!","success");
      }
     else{
        Swal.fire("Error","Erreur","error");
      }

    })

  }

  delete(imei: Imei){
    const modalRef = this.modalService.open(DeleteImeiModalComponent);
    modalRef.componentInstance.id = imei.imei_id;
    modalRef.result.then(() => this.getAllImeis(), () => { });
  }

  /*deleteImei(imei: Imei) {
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
        this.imeiService.deleteImei(imei.imei_id).subscribe(res =>{
          if(res == true){
            this.getAllImeis();
            Swal.fire(
              'Deleted!',
              'This IMEI has been deleted.',
              'success'
            )
          }else {
            Swal.fire(
              'Problem!',
              'Problem when deleting this IMEI!',
              'error'
            )
          }
        })

      }
    })

  }*/
}
