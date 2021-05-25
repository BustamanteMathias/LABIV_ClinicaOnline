import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from "../service/firebase.service";

@Injectable({
  providedIn: 'root'
})
export class ValidarAdminGuard implements CanActivate {

  constructor(private firebase: FirebaseService) {}

  canActivate(): boolean {
    let rtn:boolean = false;

    if(this.firebase.userData$.tipo == 'ADMIN'){
      return true;
    }

    return rtn;
  }
}
