import { Injectable } from '@angular/core';
import { CanActivateChild} from '@angular/router';
import { FirebaseService } from '../service/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarAdministradorGuard implements CanActivateChild {

  constructor(private firebase: FirebaseService) {}
  canActivateChild() : boolean{

    let rtn:boolean = false;

    if(this.firebase.userData$.tipo == 'ADMIN'){
      return true;
    }

    return rtn;
  }

}
