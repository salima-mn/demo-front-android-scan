import {Injectable, NgModule} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Imei} from "../models/imei";

@Injectable({
  providedIn: 'root'
})
export class UrlService {


  url='http://localhost:8888/api/';
  urlLogin='http://localhost:8888/';
  constructor(private http:HttpClient){

  }


}
