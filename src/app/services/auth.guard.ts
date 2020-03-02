import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { ngModuleJitUrl } from '@angular/compiler';
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let user = this.afAuth.auth.currentUser;
    if(!!user){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

    constructor(public auth: AuthService, private router: Router, private afAuth: AngularFireAuth) {

    }
}
