import { Component, ViewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/User';
import Swal from 'sweetalert2';

import { UserService } from '../../services/userService';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [UserService],
  imports: [MatInputModule,MatFormFieldModule, MatButtonModule, MatDividerModule,FormsModule, MatCard],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userServie: UserService, private snackBar: MatSnackBar) {}


  @ViewChild("signUpForm") form?: NgForm;
  // signUpForm?: NgForm;

  myUser: User = {};
  formSubmit(){
    console.log(this.myUser);
    // alert("submitted");
    if(this.myUser.username =='' || this.myUser.username ==null){
      // alert("username is required");
      this.snackBar.open("Username is required", 'ok',{
        duration:3000, verticalPosition:'top',
        horizontalPosition:'right'
      })
      return;
    }

    //add userService
    this.userServie.addUser(this.myUser).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        // alert("success");
        Swal.fire({
          title: "Success Done !!",
          text: "User id is "+ data.id,
          icon: "success"
        });
        this.form?.reset();
      },
      (error)=>{
        //error
        console.log("Something went worng")
        // alert(error);
        this.snackBar.open("Something went wrong", 'ok',{
      
        })
      }
    )
  }
}
