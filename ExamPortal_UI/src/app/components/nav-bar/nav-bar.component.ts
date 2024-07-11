import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  isLoggedIn = false;
  user:any = null;


    constructor(public login: LoginService, public router: Router){}
  ngOnInit(): void {
    console.log("*****************")
    if(localStorage.length!=0){
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    }
    this.login.loginStatusSubject.asObservable().subscribe((data)=>{
      console.log("##########")
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      // console.log(this.user);
    })
  }

    logout(){
      this.login.logout();
      // this.router.navigateByUrl("login");
      window.location.reload();
    }
}
