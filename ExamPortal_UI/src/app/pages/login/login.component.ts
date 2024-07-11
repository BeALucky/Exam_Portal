import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { ContentObserver } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,FormsModule,MatInputModule,MatFormFieldModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private snack: MatSnackBar, private loginService:LoginService,
     private router: Router){
     
  }

  loginData={
    username:'',
    password:''
  }

  str='';
  pass="";

  formSubmit(){
    console.log(this.loginData.username)
    console.log("Form Submitted")
    this.str = this.loginData.username;
    this.pass = this.loginData.password;
    if(this.str.trim()=='' || this.str.trim()==null){
      this.snack.open('Username is requried!!',"",{
        duration:3000
      });
      return;
    }

    if(this.pass.trim()=='' || this.pass.trim()==null){
      this.snack.open('Password is requried!!',"",{
        duration:3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("Token Generated Success");
        console.log(data);
        //login
        this.loginService.loginUser(data.jwtToken);
        this.loginService.getCurrentUser().subscribe((user:any)=>{
          this.loginService.setUser(user);
          console.log(user);
          let role = this.loginService.getUserRole();
          // let router = inject(Router);
          //Redirect .. ADMIN: admin-dashboard
          if(role=="ADMIN"){
             this.router.navigateByUrl('admin');
             this.loginService.loginStatusSubject.next(true);
             console.log("Welcom to admin dashboard")
            }
            // Redirect ..NORMAL: noraml-dashboard
            else if(role=="NORMAL"){
              this.router.navigateByUrl('user-dashboard/0');
              this.loginService.loginStatusSubject.next(true);
              console.log("Welcom to User dashboard")
          }
          else{
            this.loginService.logout();
            location.reload;
          }
          

        })
      },
      (error)=>{
        console.log("Error in generating Token");
        console.log(error)
        this.snack.open('Invalid Details !! Try again', '',{
          duration:3000
        })
      }
    )
    console.log("Form Submitted ENDED")
  }
}
