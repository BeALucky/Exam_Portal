import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule,MatButtonModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor(private login: LoginService){}
  
  user:any = null;

  ngOnInit(): void {
    this.user =this.login.getUser();

    // this.login.getCurrentUser().subscribe(
    //   (data)=> this.user =data,
    //   (error)=>alert(error)
    // )

    // console.log(this.user);
  }

  

}
