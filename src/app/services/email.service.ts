import {Injectable} from "@angular/core";
import {UrlService} from "./url.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Email} from "../models/email";
import {EmailSortant} from "../models/emailSortant";
import {User} from "../models/user";

@Injectable({
  providedIn: "root"
})
export class EmailService {

  constructor(private http:HttpClient,private urlService:UrlService){

  }

  getMailServers():Observable<Email>{
    return this.http.get<Email>(this.urlService.url+"getFirstMail");
  }

  deleteMailServer(email: Email) {
    return this.http.delete(this.urlService.url+"deleteMailServer/"+email.id);
  }

  addOrUpdateMailSever(email: Email) {
    return this.http.put(this.urlService.url+"updateMailServer",email);

  }

  sendMail(mail:EmailSortant){
    return this.http.post(`${this.urlService.url+'sendMail'}`,mail);
  }

  sendForgottenPassword(user:User){
    //Je ai ajouté '{responseType: 'text'}' car le type de retour est 'string'
    return this.http.post(this.urlService.url+"sendForgottenPassword",user, {responseType: 'text'});
  }
}
