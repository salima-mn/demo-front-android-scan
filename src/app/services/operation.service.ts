import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Operation} from "../models/operation";

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http:HttpClient, private urlservice:UrlService) { }

  getOperations(operation: Operation){
    return this.http.post(`${this.urlservice.url+'getOperations'}`, operation);
  }
}
