import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from "../service/firebase.service";

@Injectable({
  providedIn: 'root'
})
export class ValidarAdminGuard implements CanActivate {

  constructor(private firebase: FirebaseService, private router: Router) {

  }
  canActivate(): boolean {

    if(this.firebase.userData$.tipo == 'ADMIN'){
      return true;
    }else{
      this.router.navigate(['error404']);
      return false;
    }

  }

}
