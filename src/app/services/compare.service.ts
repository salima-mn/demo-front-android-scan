import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {ResultFile} from "../models/ResultFile";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  constructor(private http:HttpClient, private urlService:UrlService) { }

  uploadAndcompareFiles(params : FormData):Observable<ResultFile[]> {
    return this.http.post<ResultFile[]>(this.urlService.url + 'uploadAndCompare', params);
  }
}
