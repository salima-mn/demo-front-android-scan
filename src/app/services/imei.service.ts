import { Injectable } from '@angular/core';
import {Imei} from "../models/imei";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {ImeiRequest} from "../models/ImeiRequest";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImeiService {

  constructor(private http:HttpClient, private urlService:UrlService) { }

  getAllImeis(){
    return this.http.get(this.urlService.url+'IMEIs');
  }

  getImeiById(id:number){
    return this.http.get(this.urlService.url+'getImeiById/'+id);
  }

  updateImei(imei:Imei){
    return this.http.put(this.urlService.url+"updateIMEI",imei);
  }

  generateTokenManually(imeiReq:ImeiRequest){
   // return this.http.post(this.urlService.urlLogin+"login",imeiReq);

    return this.http.post(this.urlService.url+"generateTokenManually",imeiReq,{responseType: 'text'});
  }

  addImei(imei:Imei){
    return this.http.post(this.urlService.url+"addNewIMEI",imei);
  }

  deleteImei(imei_id:number){
    return this.http.delete(this.urlService.url+"deleteIMEI/"+imei_id);
  }

  getImeiByValue(value:string){
    return this.http.get<Imei>(`${this.urlService.url+'getImeiByValue'}/${value}`);
  }

  getStateIMEI(imei:Imei){
    return this.http.post(`${this.urlService.url+'getStateIMEI'}`,imei)
  }

  getGeneralStateIMEI(){
    return this.http.get(`${this.urlService.url+'getGeneralStateIMEI'}`)
  }

}
