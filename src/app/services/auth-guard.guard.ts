import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private userService:UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log("username in auth guard 1: ",sessionStorage.getItem("username"));
    console.log("route : ",route);
    return new Observable<boolean>(observable =>{
      console.log("username in auth guard 2: ",sessionStorage.getItem("username"));
      if(sessionStorage.getItem("username") !== "empty") {
        console.log("username in auth guard 3: ",sessionStorage.getItem("username"));
        this.userService.showSidebar = true;
        this.userService.showNavbar = true;
        this.userService.showFooter = true;
        this.userService.showSettings = true;
        document.querySelector('.main-panel').classList.remove('w-100');
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
        document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
        document.querySelector('.content-wrapper').classList.remove('p-0');
        return observable.next(true);
      }
      else{
        console.log("username in auth guard 4: ",sessionStorage.getItem("username"));
       // alert("you are not logged in!!!")
        console.log('No Existant token!!!')
        this.userService.showSidebar = false;
        this.userService.showNavbar = false;
        this.userService.showFooter = false;
        this.userService.showSettings = false;
        document.querySelector('.main-panel').classList.add('w-100');
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        this.router.navigate(["auth/login"]);
        return observable.next(false);
      }
      return observable.next(true);
    });
  }
  
}
