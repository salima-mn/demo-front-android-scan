import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  /*public showSidebar: boolean =false;
  public showNavbar: boolean =false;
  public showFooter: boolean =false;
  public showSettings: boolean =false;*/

   user: User;
  jwt:string;
  username:string;
   completeName: string;
  //isLoading: boolean;
  constructor(private http: HttpClient, private urlService:UrlService) {

  }

  getUsers(){
    return this.http.get<User[]>(this.urlService.url+'allUsers');
  }

  getUserById(id:number):Observable<User>{
    return this.http.get<User>(this.urlService.url+'getUserById/'+id);
  }

  createOrUpdateUser(user:User){
    return this.http.put(this.urlService.url+'createOrUpdateUser', user);
  }

  deleteUser(id:number){
    return this.http.delete(this.urlService.url+"deleteUser/"+id);
  }

  tryToLogin(user: User) {
    //let headers=new HttpHeaders({'Authorization':this.jwt});
    this.user=user;
    return this.http.post(this.urlService.urlLogin+"login", user,{observe:'response'});
  }


  saveJwtToken(jwt:string){
    sessionStorage.setItem('tokenJwt',jwt);
    this.jwt=jwt;
    this.parseJwt();
  }

  parseJwt(){
    let jwtHelper =new JwtHelperService();
    let objJWT=jwtHelper.decodeToken(this.jwt);
    this.username=objJWT.sub;
    console.log(this.username)
    sessionStorage.setItem('username',this.username);

    this.getUserByUsername(sessionStorage.getItem("username")).subscribe(user =>{
      console.log("user : ",user)
      this.user = user;
      this.completeName=user.firstName+' '+user.lastName;
      console.log("user : ",this.user)
    })

    //EmployeService.roles=objJWT.roles;
    //console.log("Roles are : ",EmployeService.roles)
  }


    getUserByUsername(userName: string):Observable<User>{
        return this.http.get<User>(`${this.urlService.url+'getUserByUsername/'}${userName}`);
    }


}
